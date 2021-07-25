<template>
  <div>
    <ChartBaseLine :data="chart.data" :options="chart.options" />
  </div>
</template>

<script>
import {
  CHARTS_DEFAULT_OPTIONS_AXES_TIME,
  CHARTS_DEFAULT_OPTIONS_AXES_Y,
  DEFAULT_NB_DAYS_TO_ANALYZE,
  OLD_AGE_RANGES,
} from '~/constants'
import mixinCharts from '~/mixins/mixin-charts'
import mixinData from '~/mixins/mixin-data'
import mixinDatasets from '~/mixins/mixin-datasets'
import mixinDates from '~/mixins/mixin-dates'

export default {
  name: 'ChartPredictionHospitalizations',
  mixins: [mixinCharts, mixinData, mixinDatasets, mixinDates],
  data() {
    return {
      chart: {
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
      ressources: {
        hospitalizations: {},
        dailyPositives: {},
      },
    }
  },
  mounted() {
    // Il doit y avoir une erreur => Cassure au début
    // La courbe devrait être décalée de 18 jours vers la droite
    this.setRessources()
    this.generateChartData()
  },
  methods: {
    setRessources() {
      this.ressources.hospitalizations = require('@/ressources/hospitalizations.json')
      this.ressources.dailyPositives = require('@/ressources/dailyPositives.json')
    },
    generateChartData() {
      const dailyPositivesOldData = this.cumulObjectsOfArray(
        this.ressources.dailyPositives.data,
        OLD_AGE_RANGES
      )

      const dailyPositivesData = this.getSmoothedWeekly(dailyPositivesOldData)

      const dates = this.getDatesFromStartToEnd(
        this.ressources.hospitalizations.meta.dateStart,
        this.ressources.hospitalizations.meta.dateEnd
      )
      const datesPrevisions = this.getDatesFromStartToEnd(
        this.ressources.hospitalizations.meta.dateStart,
        this.$dayjs(this.ressources.hospitalizations.meta.dateEnd).add(
          18,
          'days'
        )
      )
      this.chart.data.labels = datesPrevisions

      const datasetHosp = this.$lodash.reverse(
        this.$lodash.takeRight(
          this.$lodash.merge([], this.ressources.hospitalizations.data.all),
          DEFAULT_NB_DAYS_TO_ANALYZE
        )
      )
      const duplicated = this.$lodash.merge([], dailyPositivesData)
      const Rts = []
      for (let i = 0; i < 18; i++) {
        Rts.push(this.getRatio2Last(duplicated))
        duplicated.pop()
      }
      Rts.reverse()
      Rts.forEach((Rt) => {
        datasetHosp.unshift(parseInt(datasetHosp[0] * Rt))
      })

      const datasetPositives = this.$lodash.reverse(
        this.$lodash.takeRight(
          this.$lodash.merge([], dailyPositivesData),
          DEFAULT_NB_DAYS_TO_ANALYZE
        )
      )

      this.chart.data.datasets = [
        this.generateChartDataset(datasetPositives, dates, {
          label: 'Positifs moyens +60 ans',
          color: '#789',
        }),
        this.generateChartDataset(
          datasetHosp,
          datesPrevisions,
          {
            label: 'Hospitalisations délai 18 jours',
            color: '#000',
          } //, 18
        ),
      ]

      this.chart.options.scales.xAxes[0].time = {
        min: datesPrevisions[datesPrevisions.length - DEFAULT_NB_DAYS_TO_ANALYZE],
        max: datesPrevisions[datesPrevisions.length - 1],
      }
    },
  },
}
</script>
