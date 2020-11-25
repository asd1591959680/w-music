const path = require('path'); //引入path模块
const webpack = require('webpack');
function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}


module.exports = {

  chainWebpack: (config) => {
    config.resolve.alias
      //set第一个参数：设置的别名，第二个参数：设置的路径
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('views', resolve('./src/views'))
      .set('network', resolve('./src/network'))
      .set('common', resolve('./src/components/common'))
      .set('content', resolve('./src/components/content'))
      //注意 store 和 router 没必要配置
      config.plugin('context')
        .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])  　　　　
  },
  devServer: {
    proxy: {
        '/api': {
            // 此处的写法，目的是为了 将 /api 替换成 http://localhost:3300
            target: 'http://localhost:3300',
            // 允许跨域
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}
}



