<template>
  <div>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="px-4 py-8 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
          <div class="relative min-h-screen bg-gray-100 p-5">
            <LineChart :data="data" :options="options" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CHART_AGES } from '@/constants'

export default {
  name: 'PageIndex',
  data() {
    const covidTrackerData = require('@/ressources/covidTrackerData.json')

    const nbDays = this.$dayjs(covidTrackerData.meta.dateEnd).diff(
      covidTrackerData.meta.dateStart,
      'day'
    )

    const _this = this
    const dates = Array(nbDays + 1)
      .fill()
      .map((_, i) =>
        _this
          .$dayjs(covidTrackerData.meta.dateEnd)
          .subtract(i, 'day')
          .format('YYYY-MM-DD')
      )
      .sort()

    // Récupérer les Rt
    CHART_AGES.forEach((dataset) => {
      console.log('---------------------')
      console.log(dataset.name)
      console.log(this.getWeekRt(covidTrackerData.data[dataset.name]))
      console.log(this.getPrevWeekRt(covidTrackerData.data[dataset.name]))
      console.log(this.getPrevWeekRt(covidTrackerData.data[dataset.name], 2))
      console.log(this.getPrevWeekRt(covidTrackerData.data[dataset.name], 3))
      console.log('---------------------')
    })

    const datasets = CHART_AGES.map((dataset) => {
      return {
        label: this.$t(`charts.ageRanges.${dataset.name}`),
        data: covidTrackerData.data[dataset.name].map((val, idx) => ({
          x: dates[idx],
          y: parseInt(val),
        })),
        type: 'line',
        fill: false,
        borderColor: dataset.color, // Line color
        pointBorderColor: dataset.color, // Point color
        hidden: false, // Hide line
        pointRadius: 1, // Avoid displaying points
        pointHitRadius: 5,
        yAxisID: 'moyennes',
      }
    })

    return {
      socialShare: {
        title: this.$t('pages.index.socialShare.title'),
        description: this.$t('pages.index.socialShare.description'),
        imageUrl: '',
      },
      covidTrackerData,
      labels: dates,
      data: {
        labels: dates,
        datasets,
      },
      options: {
        aspectRatio: 1,
        maintainAspectRatio: true,
        legend: {
          display: true,
        },
        scales: {
          yAxes: [
            {
              id: 'moyennes',
              stacked: false,
              display: true,
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              // offset: true,
              stacked: true,
              type: 'time',
              distribution: 'linear',
              gridLines: {
                display: false,
              },
              time: {
                min: covidTrackerData.meta.dateStart,
                max: covidTrackerData.meta.dateEnd,
              },
            },
          ],
        },
        annotation: {
          events: ['click'],
          annotations: [],
        },
      },
    }
  },
  head() {
    return {
      title: this.$t('pages.index.head.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('pages.index.head.description'),
        },
      ],
    }
  },
  methods: {
    getWeekRt(values) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const duplicated = this.$lodash.merge([], values)

      return (
        duplicated.splice(-7, 7).reduce(reducer) /
        duplicated.splice(-7, 7).reduce(reducer)
      )
    },
    getPrevWeekRt(values, nb = 1) {
      const duplicated = this.$lodash.merge([], values)
      for (let i = 0; i < nb; i++) {
        duplicated.splice(-7, 7)
      }

      return this.getWeekRt(duplicated)
    },
  },
}
</script>
