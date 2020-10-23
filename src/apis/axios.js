import axios from 'axios';
import {message} from 'ant-design-vue';

// global defaultSettings
axios.defaults.baseURL = (process.env.NODE_ENV === 'development' ? '/api' : '') + process.env.VUE_APP_API_BASE_URL; // 开发环境中加上/api方便devServer进行代理
axios.defaults.timeout = process.env.NODE_ENV === 'development' ? 1000 * 10 * 4 : 1000 * 60 * 10;
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';

// interceptors
axios.interceptors.request.use((config) => {
  return config;
}, onError);

axios.interceptors.response.use((response) => {
  const {status, data} = response;
  if (status === 200) {
    return data;
  }
  return data;
}, onError);

// handle errors
function onError(error) {
  const {response, message: msg} = error;
  if (response) {
    const {status} = response;
    switch (status) {
      case 403:
        message.error('Forbidden');
        break;
      default: break;
    }
  } else {
    /* eslint-disable-next-line */
    console.error(msg);

    if (~msg.indexOf('timeout')) {
      message.error('Timeout');
    }
  }

  return Promise.reject(error);
}
export default axios;
