<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="min-h-screen bg-white">
    <LayoutHeader />

    <div class="py-10">
      <main>
        <nuxt />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  // Please refer to ~/layouts/README.md to understand the following required lines for SEO
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
}
</script>
