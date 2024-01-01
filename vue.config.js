const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  // publicPath 默认为/ 设定为./后这样打出来的包可以被部署在任意路径

  // chainWebpack 用于配置全局scss方法或变量
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      // sass-resources-loader 如果没有要先装一下
      // npm i sass-resources-loader -D
      item.use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 全局变量文件路径，只有一个时可将数组省去
          resources: ['./src/assets/global.scss']
        })
        .end()
    })
  },
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
