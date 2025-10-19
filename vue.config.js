const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
    // 关键：开发时代理 /api 到 8081
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        pathRewrite: { '^/api': '' } // 去掉 /api 前缀
      }
    }
  }
})
