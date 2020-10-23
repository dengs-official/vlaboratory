const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const r = (dir) => path.resolve(__dirname, dir);

module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch'); // 移除预加载
    config.resolve.alias // 配置别名
      .set('@ant-design/icons/lib/dist$', r('./src/plugins/antDesignIcon.js'));
  },
  configureWebpack: (config) => {
    const webpackConfig = {
      plugins: [
        new webpack.IgnorePlugin({ // 忽略
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        }),
        new CompressionPlugin({ // gzip压缩
          algorithm: 'gzip',
          test: /\.(js|css)$/,
          threshold: 10240,
          deleteOriginalAssets: false,
          minRatio: 0.8
        })
      ],
    };

    return webpackConfig;
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        paths: [r('./src/styles')],
        // 覆盖antd默认样式
        modifyVars: {
          // 'border-radius-base': '0',
        },
        globalVars: {
          // primary: '#fff'
        },
      },
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    port: 8000,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_ORIGIN,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
