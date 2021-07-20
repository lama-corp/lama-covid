export default {
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Covid Prochaine Vague',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@LamaCodeur',
      },
    ],
    htmlAttrs: {
      lang: 'fr',
    },
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/vue-lodash'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/dayjs', 'nuxt-i18n', '@nuxtjs/svg'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true, // Launches webpack analyze and opens it on nuxt generate
    transpile: ['lodash-es'],
  },

  // Axios configuration: https://axios.nuxtjs.org
  axios: {},

  // DayJS configuration: https://github.com/nuxt-community/dayjs-module
  dayjs: {
    locales: ['fr'],
    defaultLocale: 'fr',
    plugins: [],
  },

  // I18n configuration: https://i18n.nuxtjs.org
  i18n: {
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr.json',
      },
    ],
    defaultLocale: 'fr',
    langDir: '~/locales',
    seo: false, // Mandatory as defined in templates for performance
    // https://i18n.nuxtjs.org/seo/#improving-performance
    baseUrl: 'https://www.covid-prochaine-vague.fr',
  },
}
