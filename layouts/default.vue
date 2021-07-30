<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="min-h-screen bg-white">
    <LayoutHeader />

    <main class="mx-auto w-11/12 py-10">
      <nuxt />
    </main>

    <LayoutFooter />
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
