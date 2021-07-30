import {
  CHART_AGES,
  CHARTS_DEFAULT_DATASET_LINE,
  CHARTS_DEFAULT_OPTIONS,
  CHARTS_DEFAULT_OPTIONS_AXES_TIME,
  CHARTS_DEFAULT_OPTIONS_AXES_Y,
} from '~/constants'

export default {
  data() {
    return {
      loaded: 0,
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
                id: 'y-axis-0',
              }),
            ],
          },
          annotation: {},
        }),
      },
    }
  },
  methods: {
    getChartOptions(newOptions) {
      return this.$lodash.merge(CHARTS_DEFAULT_OPTIONS, newOptions)
    },
    generateChartsDatasetsByAge(datasets, dates) {
      return CHART_AGES.map((age) => {
        return this.$lodash.merge({}, CHARTS_DEFAULT_DATASET_LINE, {
          label: this.$t(`charts.ageRanges.${age.name}`),
          data: datasets[age.name].map((val, idx) => ({
            x: dates[dates.length - 1 - idx],
            y: parseFloat(val),
          })),
          borderColor: age.color, // Line color
          pointBorderColor: age.color, // Point color
          yAxisID: 'y-axis-0',
          hidden: age.name !== 'all',
        })
      })
    },
    generateChartDataset(dataset, dates, info, delay = 0) {
      return this.$lodash.merge({}, CHARTS_DEFAULT_DATASET_LINE, {
        label: info.label,
        data: dataset.map((val, idx) => ({
          x: dates[dates.length - 1 - idx - delay],
          y: parseFloat(val),
        })),
        borderColor: info.color, // Line color
        pointBorderColor: info.color, // Point color
        yAxisID: 'y-axis-0',
        hidden: false,
      })
    },
  },
}
