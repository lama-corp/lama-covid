import { CHART_AGES } from '~/constants'
import mixinData from '~/mixins/mixin-data'

export default {
  mixins: [mixinData],
  methods: {
    getPositivesByAgeDatasets(positivesData, nbDaysAnalyze) {
      const sourceData = this.$lodash.merge({}, positivesData)
      const RtsByAge = {}

      CHART_AGES.forEach((age) => {
        const Rts = []
        for (let i = 0; i < nbDaysAnalyze; i++) {
          Rts.push(this.getWeekRt(sourceData[age.name]))
          sourceData[age.name].pop()
        }

        RtsByAge[age.name] = Rts
      })

      return RtsByAge
    },
    getNewAdmissionsReaDataset(newAdmissionsReaData, nbDaysAnalyze) {
      const sourceData = this.$lodash.merge([], newAdmissionsReaData)

      console.log('loool', sourceData)

      const Rts = []
      for (let i = 0; i < nbDaysAnalyze; i++) {
        Rts.push(this.getWeekRt(sourceData))
        sourceData.pop()
      }
      console.log('Rts', Rts)

      return Rts
    }
  }
}
