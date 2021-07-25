<template>
  <div class="w-11/12 m-auto">
    <h1>Affichage du Rt lissé par tranche d'âge</h1>
    Rt est le taux de contagion. Pour le calculer, on applique la règle suivante
    : Rt du jour = nombre de cas du jour / nombre de cas du même jour la semaine
    passée.<br />
    Afin d'estomper les effets des weekends et jours fériés, on va utiliser un
    Rt lissé. La règle est la suivante : nombre de cas de la semaine courante /
    nombre de cas de la semaine passée<br />
    Instinctivement, je me disais : "comme les tranches d'âge âgées sont très
    vaccinées, le Rt associé sera plus faible". Il semble en moyenne très
    légèrement plus faible mais de manière non perceptible.<br />
    Ex : si j'ai un Rt de 2 sur la tranche 20-29 et de 1.9 sur la tranche 70-79
    avec initialement 1000 cas. Soit une différence de 5% entre les Rt (1 - (1.9
    / 2) = 0.05 = 5%).<br />
    En semaine 2, on aura : 1000 * 2 = 2000 cas pour les 20-29 et 1000 * 1.9 =
    1900 cas pour les 70-79.<br />
    En semaine 3, on aura : 2000 * 2 = 4000 cas pour les 20-29 et 1900 * 1.9 =
    3610 cas pour les 70-79.<br />
    En semaine 3, on aura : 4000 * 2 = 8000 cas pour les 20-29 et 3610 * 1.9 =
    6859 cas pour les 70-79.<br />
    Soit une différence de 1 - (6859 / 8000) = 0.143 = 14.3% à 3 semaines.<br />
    Conclusion 1 : avec une vaccination faite sur 6 mois (180 jours), on ne peut
    pas percevoir à l'oeil la différence entre les Rt de deux tranches d'âge
    vaccinées à des pourcentages différents.<br />
    Conclusion 2 : si une vague épidémique part d'une tranche d'âge avec un
    certain Rt, les autres tranches d'âge subiront à quelques jours de décalage
    le même Rt (sauf restriction spécifique ; ex : confinement)<br />
    Conclusion 3 : il ne faut pas en conclure que le vaccin n'est pas efficace.
    En effet, si un Rt varie, même infiniment sur des durées très longues (en
    l'occurrence la vaccination a débuté il y a 7 mois, soit 210 jours), alors
    au départ d'une nouvelle vague, le nombre de cas initial par 100 000
    habitants (taux d'incidence) de la tranche d'âge n'est pas le même.
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
    const dailyNewAdmissionsReaResp = require('@/ressources/dailyNewAdmissionsRea.json')

    const dates = this.getDatesFromStartToEnd(
      dailyNewAdmissionsReaResp.meta.dateStart,
      dailyNewAdmissionsReaResp.meta.dateEnd
    )
    this.rtsByAge.data.labels = dates

    const result = []
    console.log(dailyPositivesResp.data['60-69'].length)
    for (let i = 0; i < dailyPositivesResp.data['60-69'].length; i++) {
      result.push(
        dailyPositivesResp.data['60-69'][i] +
          dailyPositivesResp.data['70-79'][i] +
          dailyPositivesResp.data['80-89'][i]
      )
    }
    console.log(result)
    // const datasets = this.getPositivesByAgeDatasets(
    //   dailyPositivesResp.data,
    //   this.nbDaysAnalyze
    // )
    // this.rtsByAge.data.datasets = this.generateChartsDatasetsByAge(
    //   datasets,
    //   dates
    // )
    //
    // this.rtsByAge.options.scales.xAxes[0].time = {
    //   min: dates[dates.length - this.nbDaysAnalyze],
    //   max: dates[dates.length - 1],
    // }

    const dataset = this.getNewAdmissionsReaDataset(
      dailyNewAdmissionsReaResp.data,
      this.nbDaysAnalyze
    )
    const datasetCuml = this.getNewAdmissionsReaDataset(
      result,
      this.nbDaysAnalyze
    )
    console.log(datasetCuml)
    this.rtsByAge.data.datasets = [
      this.generateChartDataset(dataset, dates, {
        label: 'Rt Rea with delay 6 days',
        color: 'purple',
      }, 6),
      this.generateChartDataset(datasetCuml, dates, {
        label: 'Cumul',
        color: 'blue',
      }),
    ]

    this.rtsByAge.options.scales.xAxes[0].time = {
      min: dates[dates.length - this.nbDaysAnalyze],
      max: dates[dates.length - 1],
    }
  },
  methods: {},
}
</script>
