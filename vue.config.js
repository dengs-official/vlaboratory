const path = require('path');
const webpack = require('webpack');
const themes = require('./themes/index.js');

const r = (dir) => path.resolve(__dirname, dir);

module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: (config) => {
    const webpackConfig = {
      plugins: [
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        }),
      ],
      devtool: 'source-map',
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
          ...themes()
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
