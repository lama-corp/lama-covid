<template>
  <div>
    <ChartBaseLine
      v-if="loaded"
      :data="chart.data"
      :options="chart.options"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { DEFAULT_NB_DAYS_TO_ANALYZE } from '~/constants'
import ChartPredictionParent from '~/components/chart/prediction/ChartPredictionParent'

export default {
  name: 'ChartPredictionCases',
  extends: ChartPredictionParent,
  data() {
    return {}
  },
  async fetch() {
    this.loaded = false
    await this.getDailyPositives()
  },
  computed: {
    ...mapState({
      dailyPositivesState: (state) => state.resources.dailyPositives,
    }),
    resources() {
      return {
        dailyPositives: this.dailyPositivesState,
      }
    },
  },
  watch: {
    restrictions: {
      deep: true,
      handler() {
        this.generateChartData()
      },
    },
  },
  async mounted() {
    await this.$fetch()
    this.generateChartData()
  },
  methods: {
    generateChartData() {
      this.loaded = false
      const dates = this.getDatesFromResource(this.resources.dailyPositives)
      // 2 weeks dates
      const datesPrevisions = this.getDatesFromResource(
        this.resources.dailyPositives,
        14
      )

      const datasetPositivesOld = this.generateDatasetPositivesOld()
      const datasetPositivesOldSmoothed = this.$lodash.reverse(
        this.getSmoothedWeekly(datasetPositivesOld)
      )
      const datasetPositivesOldPrediction =
        this.generateDatasetPositivesOldPrediction(datesPrevisions)

      this.chart.data.labels = datesPrevisions

      this.chart.data.datasets = [
        this.generateChartDataset(datasetPositivesOldSmoothed, dates, {
          label: 'Personnes de 60 ans et plus',
          color: '#789',
        }),
        this.generateChartDataset(
          datasetPositivesOldPrediction,
          datesPrevisions,
          {
            label: 'Prédiction 2 semaines',
            color: 'orange',
          }
        ),
      ]

      this.chart.options.scales.xAxes[0].time = {
        min: datesPrevisions[
          datesPrevisions.length - DEFAULT_NB_DAYS_TO_ANALYZE
        ],
        max: datesPrevisions[datesPrevisions.length - 1],
      }
      const _this = this
      setTimeout(() => {
        _this.loaded = true
      }, 100)
    },
  },
}
</script>
