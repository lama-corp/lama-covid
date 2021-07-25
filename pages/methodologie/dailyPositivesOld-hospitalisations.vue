<template>
  <div class="w-11/12 m-auto">
    Daily positives 60+ and hospitalizations.<br />
    Un différence se crée sur la durée.<br />
    Les courbes se confondent / sont les mêmes avec trois ratios différents : 1
    au début, 2 au milieu et 4 à la fin.<br />
    En terme législatif, rien n'a changé sur cette période (couvre feu + toutes
    activités de loisirs fermées pour les pauvres).<br />
    Hypothèse : effet de la vaccination ; mais je ne comprends pas pourquoi.<br />
    Hypothèse : effet du variant alpha sur la souche originelle.<br />
    <br />
    Sur les dates sélectionnées, le pourcentage d'erreur moyen par semaine est
    de : (Valeur d'arrivée / Valeur de départ)^(1/n) - 1 Soit (891 / 211)^(1/14)
    = 0,0714 = 7.14%
    (http://www.mathematiques.club/terminale-es-et-l-specialite/evolutions-pourcentages/article/calculer-un-taux-d-evolution-moyen)
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
      nbDaysAnalyze: 105, // toChange
      ratio: 1, // toChange
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

    const dailyPositivesOldData = []
    for (let i = 0; i < dailyPositivesRest['70-79'].length; i++) {
      dailyPositivesOldData.push(
        dailyPositivesRest['60-69'][i] +
          dailyPositivesRest['70-79'][i] +
          dailyPositivesRest['80-89'][i] +
          dailyPositivesRest['90+'][i]
      )
    }

    const dailyPositivesData = dailyPositivesOldData.map(
      (value, index, array) => {
        let newValue = 0
        for (let i = 0; i < 7; i++) {
          // First 6 values will be incorrect but never displayed in charts
          newValue += array[index - i] ? array[index - i] : value
        }
        return newValue / 7
      }
    )

    const dates = this.getDatesFromStartToEnd(
      hospitalizationsResp.meta.dateStart,
      hospitalizationsResp.meta.dateEnd
    )
    this.rtsByAge.data.labels = dates

    const datasetHosp = this.$lodash.reverse(
      this.$lodash.takeRight(
        this.$lodash.merge(
          [],
          hospitalizationsResp.data.all.map((value) => value / this.ratio)
        ),
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
      this.generateChartDataset(datasetPositives, dates, {
        label: 'Positifs moyens +60 ans',
        color: '#789',
      }),
      this.generateChartDataset(
        datasetHosp,
        dates,
        {
          label: 'Hospitalisations délai 18 jours',
          color: '#000',
        },
        18
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
