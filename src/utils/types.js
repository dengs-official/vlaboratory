/*
 * 数据类型判断
 */

export function type(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}

export function isObject(val) {
  return val !== null && typeof val === 'object';
}

export function isPlainObject(val) {
  return type(val) === 'object';
}

export function isArray(val) {
  return Array.isArray ? Array.isArray(val) : type(val) === 'array';
}

export function isUndef(val) {
  return val === null || val === undefined;
}

export function isDef(val) {
  return !isUndef(val);
}

// 主要用于检查数据是否为空，false, 0, {}, []等均不为空
export function isEmpty(val) {
  return ['', null, undefined].includes(val);
}

export function isFn(val) {
  return typeof val === 'function';
}

export function isNumber(val) {
  return typeof val === 'number';
}

export function isString(val) {
  return typeof val === 'string';
}

export function isBool(val) {
  return typeof val === 'boolean';
}

export function isSymbol(val) {
  return typeof val === 'symbol';
}

// 是否为小数
export function isDecimal(val) {
  return (val + '').indexOf('.') > -1;
}
