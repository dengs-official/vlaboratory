/*
 * 函数式编程工具
 */
import {isFn} from './types.js';

// 事件防抖
export function debounce(fn, wait = 300, immediate = false) {
  let timerId = null;

  return function (...args) {
    if (timerId) clearTimeout(timerId);

    if (!timerId && immediate) {
      fn.apply(this, args);
      timerId = setTimeout(() => {
        timerId = null;
      }, wait);
    } else {
      timerId = setTimeout(() => {
        timerId = null;
        fn.apply(this, args);
      }, wait);
    }
  };
}

// 事件节流
export function throttle(fn, wait = 300, options = {}) {
  const {leading = false, trailing = true} = options;
  let timerId = null;
  let previous = 0;

  return function (...args) {
    const _now = Date.now();
    if (!previous && !leading) previous = _now;
    const remain = wait - (_now - previous);

    if (remain <= 0 || remain > wait) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      fn.apply(this, args);
      previous = _now;
    } else if (!timerId && trailing !== false) {
      timerId = setTimeout(() => {
        timerId = null;
        fn.apply(this, args);
        previous = leading ? Date.now() : 0;
      }, wait);
    }
  };
}

// 创造一个接受原函数剩余参数的函数
export function partial(fn, ...rest) {
  return function (...args) {
    return fn.apply(this, [...rest, ...args]);
  };
}

// 柯里化
export function curry(fn, arity) {
  let args = [];
  arity = arity || fn.length;

  function _curry(fn) {
    return function (...arg) {
      arity -= arg.length;
      args = [...args, ...arg];
      if (arity <= 0) {
        return fn.apply(this, args);
      }
      return _curry(fn);
    };
  }

  return _curry(fn);
}

// 组合函数，例如函数f(), g(), h()组合成f(g(h()))
export function compose(...fns) {
  let i = fns.length;
  return function (...args) {
    let result = args;
    while (i--) {
      result = [fns[i].apply(this, result)];
    }
    return result[0];
  };
}

// 缓存高性能消耗函数调用结果
export function memoize(fn, resolver) {
  const memoized = function (...args) {
    const {cache} = memoized;
    const addr = '' + (isFn(resolver) ? resolver.apply(this, args) : args);
    if (!Object.prototype.hasOwnProperty.call(cache, addr)) {
      cache[addr] = fn.apply(this, args);
    }
    return cache[addr];
  };
  memoized.cache = {};
  return memoized;
}
