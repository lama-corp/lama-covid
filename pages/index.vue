<template>
  <div>
    <SocialHead
      :title="socialShare.title"
      :description="socialShare.description"
      :image="socialShare.image"
    />
    <div>
      <h1 class="text-3xl font-bold leading-tight text-gray-900">
        {{ $t(`pages.index.title`) }}
      </h1>
      <div class="px-4 py-8 sm:px-0">
        <div class="relative min-h-screen p-5">
          <tabs
            v-model="currentChart"
            :tabs="['hospitalizations', 'cases']"
            t-path="pages.index.charts"
          >
            <ChartPredictionHospitalizations
              v-if="currentChart === 'hospitalizations'"
              :restrictions="restrictions"
            />
            <ChartPredictionCases
              v-if="currentChart === 'cases'"
              :restrictions="restrictions"
            />
            <!--
            <ChartPredictionDeaths
              v-show="currentChart === 'deaths'"
            />
            -->
          </tabs>
          <div class="pt-5 flex justify-around">
            <div v-for="restriction in restrictions" :key="restriction.name">
              <input-toggle
                v-model="restriction.isActive"
                :disabled="restriction.disabled"
                :label="$t(`constants.restrictions.${restriction.name}.label`)"
                :sub-label="
                  $t(`constants.restrictions.${restriction.name}.subLabel`)
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      restrictions: [
        {
          name: 'healthPassport',
          coefficient: -0.3,
          dateStart: '2021-07-21',
          isActive: true,
          disabled: true,
        },
        {
          name: 'healthPassportExtended',
          coefficient: -0.3,
          dateStart: '2021-08-01',
          isActive: true,
          disabled: false,
        },
      ],
      currentChart: 'hospitalizations',
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
