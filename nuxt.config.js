export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr : false,
  server: {
    port: process.env.PORT || 8080, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  head: {
    title: 'Moshi Moshi Family Massage & Reflexology',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@mdi/font/css/materialdesignicons.min.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/auth.js',
    { src: '~/plugins/amplify.js', mode: 'client' },
    // { src: '~/plugins/persisted.js'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-buefy',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  serverMiddleware: [
    '~/api/user',
    '~/api/types',
    '~/api/therapists',
    '~/api/promos',
    '~/api/members',
    '~/api/htransaction',
    '~/api/dtransaction',
    '~/api/absence'
  ],

  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL,
    API_URL: process.env.API_URL,
    ADMIN_USER: process.env.ADMIN_USER,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
}
