import axios from './axios.js';
import foo from './foo.js';

const apis = {

};

assign(
  apis,
  foo,
);

export default Object.keys(apis).reduce((obj, key) => {
  const api = apis[key];
  if (!api.method) {
    api.method = 'get';
  }
  // 调用时可传入config覆盖默认配置
  obj[key] = (params = {}, config = {}, customConfig = {}) => {
    // Restful风格的动态路径参数
    const {dynamicSegment} = customConfig;
    if (dynamicSegment) {
      Object.keys(dynamicSegment).forEach((key) => {
        const item = dynamicSegment[key];
        api.url = api.url.replace(new RegExp(`:${key}`, 'g'), item);
      });
    }

    return axios({
      ...api,
      [['get', 'delete'].includes(api.method) ? 'params' : 'data']: params,
      ...config
    });
  };
  return obj;
}, {});

function assign(obj, ...rest) {
  rest.forEach((item) => {
    Object.keys(item).forEach((key) => {
      // 防止assign时出现重名api覆盖而引起的bug
      if (obj[key]) {
        throw new Error(`api '${key}' is alreay defined`);
      }
    });
    Object.assign(obj, item);
  });
  return obj;
}
