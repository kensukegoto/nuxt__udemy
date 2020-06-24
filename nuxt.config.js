const bodyParser = require("body-parser");
const axios = require("axios");

export default {
  srcDir: 'src/',
  router: {
    base: '/news/special/nyanco/'
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~plugins/core-components.js",
    "~plugins/data-filter.js"
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: process.env.BASE_URL || "https://nuxt-blog-e4e18.firebaseio.com",
    credetials: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || "https://nuxt-blog-e4e18.firebaseio.com",
    fbAPIKey: "AIzaSyAAqP3z8qTNxBSjuqbWFrbTLHyUGOk-dY8"
  },
  serverMiddleware: [
    bodyParser.json(),
    "~/api"
  ],
  generate: {
    routes: function(){
      return axios.get("https://nuxt-blog-e4e18.firebaseio.com/posts.json")
        .then(res => {

          // return Object.keys(res.data).map(k => `/posts/${k}`);
          return Object.keys(res.data).map(k => ({
            route: `/posts/${k}`,
            payload: {postData: res.data[k]}
          }));
      
        })
     
    }
  }
}
