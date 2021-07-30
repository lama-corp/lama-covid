<template>
  <div>
    <ChartBaseLine v-if="loaded" :data="chart.data" :options="chart.options" />
    <p class="text-xs">
      *(1) : Le nombre total de lits de réanimation est un nombre variable. A
      été choisi le nombre de
      <a
        href="https://www.la-croix.com/Sciences-et-ethique/Covid-19-combien-lits-reanimation-sont-ouverts-France-2021-03-23-1201147162"
        target="_blank"
        title="Source de la donnée 7500 lits lors de la troisième vague"
        hreflang="fr"
      >
        7500 lits
      </a>
      . Officiellement,
      <a
        href="https://sante.journaldesfemmes.fr/fiches-maladies/2627893-hospitalisation-covid-19-france-reanimation-chiffre-courbe-cas-nombre-mort-evolution-aujourd-hui/"
        target="_blank"
        title=""
        hreflang="fr"
      >
        5000 lits
      </a>
      sont actuellement disponibles.
    </p>
    <p class="text-xs">
      *(2) : Pourcentage d'erreur estimé de
      <a href="#inertia-hospitalizations"> 15% par semaine </a>.
    </p>
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
    return {}
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
    this.chart.options.annotation = {
      drawTime: 'beforeDatasetsDraw',
      events: ['click'],
      annotations: [
        {
          drawTime: 'beforeDatasetsDraw',
          id: 'hline',
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 3750,
          borderColor: 'firebrick',
          borderWidth: 2,
          label: {
            content: 'Capacité réanimation 50% *(1)',
            enabled: true,
            fontSize: 11,
            backgroundColor: 'rgba(0,0,0,0.8)',
          },
        },
        {
          drawTime: 'beforeDatasetsDraw',
          id: 'hline2',
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 7500,
          borderColor: 'darkred',
          borderWidth: 3,
          label: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            fontSize: 11,
            content: 'Saturation réanimation *(1)',
            enabled: true,
          },
        },
      ],
    }
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

      const datasetHospitalizationsPrediction =
        newDatasetHospitalizations.splice(0, 14)
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
        14
      )
      const datesPredictionsCases = this.getDatesFromResource(
        this.resources.hospitalizations,
        28
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
            label: 'Prédictions à 14 jours',
            color: 'orange',
          }
        ),
        this.generateChartDataset(
          datasetHospitalizationsPredictionsOnCases,
          datesPredictionsCases,
          {
            label: 'Prédictions à 28 jours',
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
