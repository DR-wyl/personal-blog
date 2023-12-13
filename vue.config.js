const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  // publicPath 默认为/ 设定为./后这样打出来的包可以被部署在任意路径
  devServer: {
    host: process.env.VUE_APP_GOBAL_HOST,
    port: process.env.VUE_APP_GOBAL_PORT,
    allowedHosts: 'all',
    proxy: {
      '/development': {
        changeOrigin: true,
        pathRewrite: {
          '^/development': ''
        },
        target: 'http://127.0.0.1:3000'
      },
      '/test': {
        changeOrigin: true,
        pathRewrite: {
          '^/test': ''
        },
        target: 'http://127.0.0.1:3000'
      },
      '/production': {
        changeOrigin: true,
        pathRewrite: {
          '^/production': ''
        },
        target: 'http://127.0.0.1:3000'
      },
    }
  }
})
