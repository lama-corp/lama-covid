<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="min-h-screen bg-white">
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex flex-grow">
            <div class="flex-shrink-0 flex items-center">
              <IconVirus class="w-8 h-8 text-indigo-600" />
            </div>
            <div class="flex-grow flex justify-between">
              <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                <a
                  href="#"
                  class="
                    font-semibold
                    text-lg
                    border-indigo-500
                    text-gray-900
                    inline-flex
                    items-center
                    px-1
                    pt-1
                    border-b-2
                    text-sm
                    font-medium
                  "
                  aria-current="page"
                >
                  Prochaine vague
                </a>
              </div>
              <div class="flex items-center">
                <button
                  type="button"
                  class="
                    mx-4
                    inline-flex
                    items-center
                    px-4
                    py-2
                    border border-gray-300
                    shadow-sm
                    text-base
                    font-medium
                    rounded-md
                    text-gray-700
                    bg-white
                    hover:bg-gray-50
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-indigo-500
                  "
                >
                  Code source
                </button>
                <button
                  type="button"
                  class="
                    inline-flex
                    items-center
                    px-4
                    py-2
                    border border-gray-300
                    shadow-sm
                    text-base
                    font-medium
                    rounded-md
                    text-gray-700
                    bg-white
                    hover:bg-gray-50
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-indigo-500
                  "
                >
                  Se faire vacciner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="py-10">
      <main>
        <nuxt />
      </main>
    </div>
  </div>
</template>

<script>
import IconVirus from '~/assets/icon-virus.svg?inline'

export default {
  components: {
    IconVirus,
  },
  // Please refer to ~/layouts/README.md to understand the following required lines for SEO
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
}
</script>
