<template>
  <div class="w-11/12 m-auto">
    <h1>Afficher</h1>
    Les hospitalisations baissent / montent moins aux extrêmes.<br />
    Hypothèse 1 : Quand l'épidémie est forte, les personnes à risque font plus
    attention ; elle se relachent quand l'épidémie est faible, et dans l'entre
    deux, un point d'équilibre est atteint.<br />
    Hypothèse 2 : La qualité des soins prodigué dépend de la saturation de
    hôpital. Quand l'hôpital sature, un tri des patients s'opère.<br />
    Hypothèse 3 : autres chose !<br />
    Question : Théoriquement avec la vaccination, cette courbe devrait varier au
    fil du temps. Il doit être possible de calculer ce %. Problème : Je n'ai pas
    accès aux données antérieures à Mars.
    <LineChart :data="rtsByAge.data" :options="rtsByAge.options" />
    2222
  </div>
</template>

<script>
import {
  CHARTS_DEFAULT_OPTIONS_AXES_TIME,
  CHARTS_DEFAULT_OPTIONS_AXES_Y,
} from '@/constants'
import mixinCharts from '@/mixins/mixin-charts'
import mixinDatasets from '@/mixins/mixin-datasets'
import mixinDates from '@/mixins/mixin-dates'

export default {
  name: 'PageMethodologie',
  mixins: [mixinCharts, mixinDatasets, mixinDates],
  data() {
    return {
      nbDaysAnalyze: 112,
      rtsByAge: {
        data: {
          labels: [], // dates,
          datasets: [],
        },
        options: this.getChartOptions({
          scales: {
            xAxes: [this.$lodash.merge({}, CHARTS_DEFAULT_OPTIONS_AXES_TIME)],
            yAxes: [
              this.$lodash.merge({}, CHARTS_DEFAULT_OPTIONS_AXES_Y, {
                id: 'moyennes',
              }),
            ],
          },
        }),
      },
    }
  },
  mounted() {
    const hospitalizationsResp = require('@/ressources/hospitalizations.json')
    const dailyPositivesRest = require('@/ressources/dailyPositives.json').data
      .all

    const dailyPositivesData = dailyPositivesRest.map((value, index, array) => {
      let newValue = 0
      for (let i = 0; i < 7; i++) {
        // First 6 values will be incorrect but never displayed in charts
        newValue += array[index - i] ? array[index - i] : value
      }
      return newValue / 7
    })

    const dates = this.getDatesFromStartToEnd(
      hospitalizationsResp.meta.dateStart,
      hospitalizationsResp.meta.dateEnd
    )
    this.rtsByAge.data.labels = dates

    const datasetHosp = this.$lodash.reverse(
      this.$lodash.takeRight(
        this.$lodash.merge([], hospitalizationsResp.data.all),
        // this.$lodash.merge([], dailyPositivesData),
        this.nbDaysAnalyze
      )
    )

    const datasetPositives = this.$lodash.reverse(
      this.$lodash.takeRight(
        this.$lodash.merge([], dailyPositivesData),
        this.nbDaysAnalyze
      )
    )

    this.rtsByAge.data.datasets = [
      this.generateChartDataset(
        datasetPositives.map((value) => value / 5),
        dates,
        {
          label: 'Positifs moyens / 5',
          color: '#789',
        }
      ),
      this.generateChartDataset(
        datasetHosp,
        dates,
        {
          label: 'Hospitalisations délai 15 jours',
          color: '#000',
        },
        15
      ),
    ]

    this.rtsByAge.options.scales.xAxes[0].time = {
      min: dates[dates.length - this.nbDaysAnalyze],
      max: dates[dates.length - 1],
    }
  },
  methods: {},
}
</script>
