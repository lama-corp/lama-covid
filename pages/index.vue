<template>
  <div>
    <SocialHead
      :title="socialShare.title"
      :description="socialShare.description"
      :image="socialShare.image"
    />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">
        {{ $t(`pages.index.title`) }}
      </h1>
    </div>
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="px-4 py-8 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
          <div class="relative min-h-screen bg-gray-100 p-5">
            <h1 class="text-3xl font-bold leading-tight text-gray-900">
              Labels
            </h1>
            {{ labels }}
            {{ dataFirstInj }}
            <LineChart :data="data" :options="options" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  async asyncData({ $axios }) {
    const stats = await $axios.$get(
      'https://api.github.com/repos/nuxt/nuxt.js/stats/commit_activity'
    )
    return {
      barChartData: {
        labels: stats.map((stat) =>
          moment(stat.week * 1000).format('GGGG[-W]WW')
        ),
        datasets: [
          {
            label: 'Nuxt Commit Activity',
            backgroundColor: '#41B38A',
            data: stats.map((stat) => stat.total),
          },
        ],
      },
    }
  },
  data() {
    const covidTrackerData = require('~/ressources/covidTrackerData.json')

    const dataFirstInjections = covidTrackerData.n_dose1.map((val, idx) => ({
      x: covidTrackerData.dates[idx],
      y: parseInt(val),
    }))

    const maxY = Math.max.apply(null, covidTrackerData.n_dose1)
    const maxValue = Math.round( (maxY+ 100000) / 100000) * 100000

    return {
      socialShare: {
        title: this.$t('pages.index.socialShare.title'),
        description: this.$t('pages.index.socialShare.description'),
        imageUrl: '',
      },
      covidTrackerData,
      labels: covidTrackerData.dates,
      dataFirstInj: dataFirstInjections,
      data: {
        labels: covidTrackerData.dates,
        datasets: [
          {
            label: 'Nombre de premières doses ',
            data: dataFirstInjections,
            type: 'line',
            fill: false,
            borderColor: '#1796e6', // Line color
            pointBorderColor: '#1796e6', // Point color
            hidden: false, // Hide line
            pointRadius: 1, // Avoid displaying points
            yAxisID: 'moyennes',
          },
        ],
      },
      options: {
        aspectRatio: 1,
        maintainAspectRatio: false,
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
                display: true
              },
              ticks: {
                max: maxValue,
                min: 0,
                callback(value) {
                  return value / 1000 + ' k'
                },
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
                min: moment('2021-01-01'),
                max: moment(),
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
}
</script>
