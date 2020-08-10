/*
 * 注册vant组件
 * 按需引入，自行在此处添加
 */

import Vue from 'vue';
import {
  // Button,
  Icon,
  NavBar,
  Tabbar,
  TabbarItem
} from 'vant';

const components = [
  // Button,
  Icon,
  NavBar,
  Tabbar,
  TabbarItem
];

components.forEach((item) => {
  Vue.use(item);
});

// 挂载组件
// Vue.prototype.$message = message;

// 全局配置
// message
// message.config({
//   top: '88px',
//   duration: 2.5,
// });
