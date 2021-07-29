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
import { mapActions, mapState } from 'vuex'
import { DEFAULT_NB_DAYS_TO_ANALYZE, OLD_AGE_RANGES } from '~/constants'
import ChartPredictionParent from '~/components/chart/prediction/ChartPredictionParent'

export default {
  name: 'ChartPredictionHospitalizations',
  extends: ChartPredictionParent,
  data() {
    return {
      // annotation: {
      //   events: ['click'],
      //   annotations: [
      //     {
      //       id: 'hline',
      //       type: 'line',
      //       mode: 'horizontal',
      //       scaleID: 'y-axis-0',
      //       value: 2000,
      //       borderColor: 'green',
      //       borderWidth: 3,
      //       label: {
      //         backgroundColor: 'green',
      //         content: 'Objectif',
      //         enabled: true,
      //       },
      //       onClick (e) {
      //         console.log('Annotation', e.type, this)
      //       },
      //     },
      //   ],
      // },
    }
  },
  async fetch() {
    this.loaded = false
    await this.getHospitalizations()
    await this.getDailyPositives()
  },
  computed: {
    ...mapState({
      dailyPositivesState: (state) => state.resources.dailyPositives,
      hospitalizationsState: (state) => state.resources.hospitalizations,
    }),
    resources() {
      return {
        dailyPositives: this.dailyPositivesState,
        hospitalizations: this.hospitalizationsState,
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
    ...mapActions({
      getDailyPositives: 'getAndStoreDailyPositives',
      getHospitalizations: 'getAndStoreHospitalizations',
    }),
    generateDatasetHospitalizations() {
      return this.$lodash.reverse(
        this.$lodash.takeRight(
          this.$lodash.merge([], this.resources.hospitalizations.data.all),
          DEFAULT_NB_DAYS_TO_ANALYZE
        )
      )
    },
    generateDatasetHospitalizationsPredictions(datasetHospitalizations) {
      const newDatasetHospitalizations = this.$lodash.merge(
        [],
        datasetHospitalizations
      )
      const dailyPositivesOldData = this.cumulObjectsOfArray(
        this.resources.dailyPositives.data,
        OLD_AGE_RANGES
      )
      const dailyPositivesData = this.getSmoothedWeekly(dailyPositivesOldData)
      const duplicated = this.$lodash.merge([], dailyPositivesData)
      const Rts = []
      for (let i = 0; i < 18; i++) {
        Rts.push(this.getRatio2Last(duplicated))
        duplicated.pop()
      }
      Rts.reverse()
      Rts.forEach((Rt) => {
        newDatasetHospitalizations.unshift(
          parseInt(newDatasetHospitalizations[0] * Rt)
        )
      })

      const datasetHospitalizationsPrediction =
        newDatasetHospitalizations.splice(0, 18)
      datasetHospitalizationsPrediction.push(newDatasetHospitalizations[0])

      return datasetHospitalizationsPrediction
    },
    generateDatasetHospitalizationsPredictionsOnCases(
      datasetHospitalizationsWithPredictions,
      datasetCasesWithPredictions
    ) {
      const newDatasetHospitalizations = this.$lodash.merge(
        [],
        datasetHospitalizationsWithPredictions
      )
      const dailyPositivesData = this.getSmoothedWeekly(
        datasetCasesWithPredictions.reverse()
      )
      const duplicated = this.$lodash.merge([], dailyPositivesData)
      const Rts = []
      for (let i = 0; i < 14; i++) {
        Rts.push(this.getRatio2Last(duplicated))
        duplicated.pop()
      }
      Rts.reverse()
      Rts.forEach((Rt) => {
        newDatasetHospitalizations.unshift(
          parseInt(newDatasetHospitalizations[0] * Rt)
        )
      })

      const datasetHospitalizationsPredictionOnCases =
        newDatasetHospitalizations.splice(0, 14)
      datasetHospitalizationsPredictionOnCases.push(
        newDatasetHospitalizations[0]
      )

      return datasetHospitalizationsPredictionOnCases
    },
    generateChartData() {
      this.loaded = false
      const datasetHospitalizations = this.generateDatasetHospitalizations()
      const datasetHospitalizationsPredictions =
        this.generateDatasetHospitalizationsPredictions(datasetHospitalizations)
      this.$lodash.merge([], datasetHospitalizationsPredictions)
      const datasetHospitalizationsPredictionsOnCases =
        this.generateDatasetHospitalizationsPredictionsOnCases(
          datasetHospitalizationsPredictions,
          this.generateDatasetPositivesOldPrediction(
            this.getDatesFromResource(this.resources.dailyPositives, 14)
          )
        )

      const dates = this.getDatesFromResource(this.resources.hospitalizations)
      const datesPredictions = this.getDatesFromResource(
        this.resources.hospitalizations,
        18
      )
      const datesPredictionsCases = this.getDatesFromResource(
        this.resources.hospitalizations,
        32
      )
      this.chart.data.labels = datesPredictionsCases

      this.chart.data.datasets = [
        this.generateChartDataset(datasetHospitalizations, dates, {
          label: 'Hospitalisations',
          color: '#789',
        }),
        this.generateChartDataset(
          datasetHospitalizationsPredictions,
          datesPredictions,
          {
            label: 'Prédictions à 18 jours',
            color: 'orange',
          }
        ),
        this.generateChartDataset(
          datasetHospitalizationsPredictionsOnCases,
          datesPredictionsCases,
          {
            label: 'Prédictions à 32 jours',
            color: 'salmon',
          }
        ),
      ]

      this.chart.options.scales.xAxes[0].time = {
        min: datesPredictions[
          datesPredictions.length - DEFAULT_NB_DAYS_TO_ANALYZE
        ],
        max: datesPredictionsCases[datesPredictionsCases.length - 1],
      }
      const _this = this
      setTimeout(() => {
        _this.loaded = true
      }, 100)
    },
  },
}
</script>
