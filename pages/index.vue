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
              Ceci est un test
            </h1>
            <LineChart
              :data="{
                labels: ['Janv', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin', 'Juill'],
                datasets: [
                  {
                    label: 'My First DS',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                  },
                ],
              }"
              :options="{
                type: 'line',
              }"
            />
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
    return {
      socialShare: {
        title: this.$t('pages.index.socialShare.title'),
        description: this.$t('pages.index.socialShare.description'),
        imageUrl: '',
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
