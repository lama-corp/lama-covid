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
      <!-- Replace with your content -->
      <div class="px-4 py-8 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
          <Tutorial />
        </div>
      </div>
      <!-- /End replace -->
    </div>
  </div>
</template>

<script>
export default {
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
