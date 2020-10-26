import Vue from 'vue';

// 利用context特性自动加载components下组件
const importCTX = require.context('./', true, /.+\.(vue|js|jsx)$/);
const components = importCTX.keys()
  .filter((key) => key.search(/template|index/) < 0)
  .map((key) => importCTX(key).default);

// 注册全局组件
components.forEach((item) => {
  Vue.component(item.name, item);
});
