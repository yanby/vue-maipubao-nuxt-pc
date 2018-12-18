const webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ],
    script: [
      {src: 'http://api.map.baidu.com/api?v=2.0&ak=OxAEbfrVXXqWUSC4nP8mYi3bTKRBcP6u'},
      {src: "https://s23.cnzz.com/z_stat.php?id=1275598476&web_id=1275598476"}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/youmeng'
  ],
  //全局css
  css:[
    '~assets/css/base.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*关闭ESLint
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
    vendor: [
      'axios',
      'element-ui'
    ],
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ],
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery'
      })
    ]
  }
}

