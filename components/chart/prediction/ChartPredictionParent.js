import { mapActions } from 'vuex'
import {
  DEFAULT_NB_DAYS_TO_ANALYZE,
  DEFAULT_NB_WEEKS_CASES_PREVISION,
  OLD_AGE_RANGES,
} from '~/constants'
import mixinCharts from '~/mixins/mixin-charts'
import mixinData from '~/mixins/mixin-data'
import mixinDatasets from '~/mixins/mixin-datasets'
import mixinDates from '~/mixins/mixin-dates'

export default {
  props: {
    restrictions: {
      type: Array,
      default() {
        return []
      },
    },
  },
  mixins: [mixinCharts, mixinData, mixinDatasets, mixinDates],
  methods: {
    ...mapActions({
      getDailyPositives: 'getAndStoreDailyPositives',
    }),
    getDatesFromResource(resource, add) {
      return this.getDatesFromStartToEnd(
        resource.meta.dateStart,
        add
          ? this.$dayjs(resource.meta.dateEnd).add(add, 'days')
          : resource.meta.dateEnd
      )
    },
    generateDatasetPositivesOld() {
      const dailyPositivesOldData = this.cumulObjectsOfArray(
        this.resources.dailyPositives.data,
        OLD_AGE_RANGES
      )

      return this.$lodash.takeRight(
        this.$lodash.merge([], dailyPositivesOldData),
        DEFAULT_NB_DAYS_TO_ANALYZE + 7
      )
    },
    // TODO: We should smooth the values!
    // But to do that, we should stop using a smoothed datasetPositivesOld
    // Or it would smooth a smoothed value... NOT GOOD!!!!!!!!!!!!!!!!!!!!!!!!!
    generateDatasetPositivesOldPrediction(datesPrevisions) {
      let newDataset = this.$lodash.merge(
        [],
        this.generateDatasetPositivesOld().reverse()
      )
      let i = DEFAULT_NB_WEEKS_CASES_PREVISION - 1
      // We have to loop to do predictions on previous weeks
      // Current version only take Rt from a week to another, it would be nice to predict inflexions points... But a bit complex
      while (i >= 0) {
        const duplicated = this.$lodash.merge([], newDataset)
        const Rt = this.getWeekRt(duplicated.reverse())

        for (let j = 0; j < 7; j++) {
          // Applying restrictions
          let RtWithRestrictions = Rt
          this.restrictions.forEach((restriction) => {
            const restrictionDate = this.$dayjs(restriction.dateStart)
              .add(4, 'day')
              .format('YYYY-MM-DD')
            // We only have to apply Rt for one week as next week Rt is calculated from previous one
            const endApplyRestriction = this.$dayjs(restriction.dateStart)
              .add(11, 'day')
              .format('YYYY-MM-DD')
            if (
              restriction.isActive &&
              datesPrevisions[datesPrevisions.length - 1 - i * 7 - j] >=
                restrictionDate &&
              datesPrevisions[datesPrevisions.length - 1 - i * 7 - j] <
                endApplyRestriction
            ) {
              // console.log('RtWithRestrictions')
              RtWithRestrictions =
                RtWithRestrictions * (1 + restriction.coefficient)
            }
          })
          // console.log(RtWithRestrictions)
          newDataset.unshift(parseInt(newDataset[6] * RtWithRestrictions))
        }
        i--
      }

      // I would like to kill myself right now...
      newDataset = this.getSmoothedWeekly(newDataset)
      const datasetPositivesOldPrediction = newDataset.splice(
        6,
        DEFAULT_NB_WEEKS_CASES_PREVISION * 7
      )
      datasetPositivesOldPrediction.push(
        newDataset[DEFAULT_NB_WEEKS_CASES_PREVISION * 7 - 7 - 1]
      )

      return datasetPositivesOldPrediction
    },
  },
}
