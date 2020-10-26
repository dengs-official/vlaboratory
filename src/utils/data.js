/*
 * 数据操作
 */
import {isObject, isPlainObject, isArray} from './types.js';

// 和Object.assign类似，但不会覆盖已有的属性值
export function assign(obj, ...rest) {
  rest.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = item[key];
      }
    });
  });
  return obj;
}

// 和Object.assign类似，但遇到对象时会混合而非直接覆盖，且不会改变原始对象
export function merge(obj, ...rest) {
  if (!isObject(obj)) return obj;

  rest.forEach((src) => {
    if (!isObject(src)) {
      throw new Error('merge params must be Object or Array');
    }
    for (const i in src) {
      if (Object.prototype.hasOwnProperty.call(src, i)) {
        if ((isPlainObject(obj[i]) && isPlainObject(src[i])) || (isArray(obj[i]) && isArray(src[i]))) {
          merge(obj[i], src[i]);
        } else {
          obj[i] = src[i];
        }
      }
    }
  });
  return obj;
}

// 深拷贝
export function deepClone(obj) {
  if (!isPlainObject(obj) && !isArray(obj)) return obj;

  const res = isArray(obj) ? [] : {};
  for (const i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      res[i] = deepClone(obj[i]);
    }
  }
  return res;
}

// 拍平数组
export function flatArray(array) {
  const flattend = [];
  (function flat_(array) {
    array.forEach((el) => {
      if (Array.isArray(el)) flat_(el);
      else flattend.push(el);
    });
  })(array);
  return flattend;
}
