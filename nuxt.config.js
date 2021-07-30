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

  // Usage: https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL,
  },
  privateRuntimeConfig: {},

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/scss/global.scss'],

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
    // https://image.nuxtjs.org
    '@nuxt/image',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    'nuxt-i18n',
    '@nuxtjs/svg',
    '@nuxtjs/robots',
    // Has to be declared at the end
    '@nuxtjs/sitemap',
  ],

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

  // Robots.txt configuration: https://github.com/nuxt-community/robots-module
  robots: () => {
    if (process.env.NODE_ENV !== 'production') {
      return {
        UserAgent: '*',
        Disallow: '/',
      }
    } else {
      return [
        {
          UserAgent: '*',
          Allow: '*',
          Sitemap: 'https://www.covid-prochaine-vague.fr/sitemap.xml',
          Host: 'https://www.covid-prochaine-vague.fr',
        },
      ]
    }
  },

  // Sitemap configuration: https://sitemap.nuxtjs.org/fr/
  sitemap() {
    if (process.env.NODE_ENV !== 'production') {
      return false
    } else {
      return {
        hostname: 'https://www.covid-prochaine-vague.fr',
        gzip: true,
        lastmod: '2021-07-30',
        routes: [
          {
            url: '/',
            changefreq: 'daily',
            priority: 1,
            lastmod: new Date(),
          },
        ],
      }
    }
  },

  // Stylelint configuration: https://github.com/nuxt-community/stylelint-module
  stylelint: {
    // syntax: 'scss',
    // extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
    rules: {
      'at-rule-no-unknown': [
        true,
        {
          ignoreAtRules: ['font-named-instance'],
        },
      ],
    },
  },

  // Tailwind CSS configuration: https://tailwindcss.nuxtjs.org
  tailwindcss: {
    config: {
      plugins: [require('@tailwindcss/forms')],
    },
  },
}
