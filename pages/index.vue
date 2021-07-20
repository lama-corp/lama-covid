<template>
  <div>
    <SocialHead
      :title="seo.title"
      :description="seo.description"
      :image="seo.image"
    />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">
        Prévision de la prochaine vague de la Covid-19
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
      seo: {
        title: 'Covid: Prévisions prochaine vague',
        description:
          'Courbes et analyses du nombre de cas de Covid-19 en France au cours des prochaines semaines.',
        imageUrl: '',
      },
    }
  },
  head: {
    title: 'Covid Prochaine Vague - prédire analyser comprendre',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Covid prochaine vague : comprendre le propagation du Covid-19 au sein de la population française',
      },
    ],
  },
}
</script>
