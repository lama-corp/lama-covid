<template>
  <div class="w-11/12 m-auto">
    Pour chaque jour d'hospitalisation, on génére un table "entrées et sorties
    de l'hopital" via dailyNbHosp = nbHosp[jour] - nbHosp[jour - 1]<br />
    On ne peut pas supprimer le problème en décalant l'axe des ordonnées en
    fonction de la valeur minimal, sinon le Rt généré à partir de ça n'a plus de
    sens Le graph ci-dessous est dégueulasse car il y a des divisions par 0
    lors du calcul du Rt lissé (si (nbHosp[jour] - nbHosp[jour - 1]) sur 7 jours
    = 0)
    <LineChart :data="rtsByAge.data" :options="rtsByAge.options" />
    2222
  </div>
</template>

<script>
import {
  CHART_AGES,
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
      nbDaysAnalyze: 105,
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
    const dailyPositivesResp = require('@/ressources/dailyPositives.json')
    const dailyHospitalizationsResp =
      require('@/ressources/hospitalizations.json').data
    const dailyHospitalizationsData = {}
    CHART_AGES.forEach((age) => {
      dailyHospitalizationsData[age.name] = dailyHospitalizationsResp[
        age.name
      ].map((current, index, array) => {
        return array[index - 1] ? current - array[index - 1] : 0
      })
    })

    const dates = this.getDatesFromStartToEnd(
      dailyPositivesResp.meta.dateStart,
      dailyPositivesResp.meta.dateEnd
    )
    this.rtsByAge.data.labels = dates

    // const datasets = this.getPositivesByAgeDatasets(dailyPositivesResp.data)
    console.log('dailyHospitalizationsData', dailyHospitalizationsData)
    const datasets = this.getPositivesByAgeDatasets(dailyHospitalizationsData)
    this.rtsByAge.data.datasets = this.generateChartsDatasetsByAge(
      datasets,
      dates
    )

    this.rtsByAge.options.scales.xAxes[0].time = {
      min: dates[dates.length - this.nbDaysAnalyze],
      max: dates[dates.length - 1],
    }
  },
  methods: {},
}
</script>
