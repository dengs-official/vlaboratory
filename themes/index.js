/*
 * 通过less-loader的modifyVars定制vant主题样式
 */

const defaultTheme = require('./default.js');

const themes = {
  default: defaultTheme,
};

module.exports = (theme = 'default') => {
  return themes[theme];
};
