import Mock from 'mockjs';
const {mock, Random} = Mock;

// 模拟请求
function mapi({success = true, timeout = '200-600', res = {}, err} = {}) {
  if (typeof timeout === 'string') {
    timeout = timeout.split('-');
  } else {
    timeout = [timeout, timeout];
  }
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      success ? resolve(res) : reject(err || new Error());
    }, Random.natural(+timeout[0], +timeout[1]));
  });
  return p;
}

export {mapi, mock, Random, Mock};

// 扩展Random类型
Random.extend({

});
