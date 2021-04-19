// vue.config.js
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    proxy: {
      '/user': {
        target: 'http://localhost:3000/user',
        changOrigin: true,
        pathRewrite: {
          '^/user': '' // 思路是如果是开发环境，就给所有要代理的接口统一加上前缀，然后代理请求时再统一通过rewrite去掉
        }
      },
      '/dialog': {
        target: 'http://localhost:3000/dialog',
        changOrigin: true,
        pathRewrite: {
          '^/dialog': ''
        }
      },
    },
    host: 'localhost',
    port: 8080
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
