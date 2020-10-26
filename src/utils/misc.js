/*
 * 杂项
 */

// 实现单例模式
export function createSingleton(ClassName, ...rest) {
  const singletonName = `__${ClassName.name || ''}Singleton__`;
  if (!ClassName[singletonName]) {
    Object.defineProperty(ClassName, singletonName, {
      value: new ClassName(...rest),
      writable: false,
      enumerable: false
    });
  }
  return ClassName[singletonName];
}

// 导出文件
export function downloadFile(url, fileName) {
  // 未传入文件名则取url中的文件名
  if (!fileName) {
    const tmp = url.split('/');
    fileName = tmp[tmp.length - 1];
  }

  const a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = fileName;
  if (process.env.NODE_ENV === 'development') {
    a.target = '_blank';
  }
  a.click();
  document.body.removeChild(a);
}

// 配合路由跳转动态设置页面title
export function setDocumentTitle(title = '') {
  document.title = title;
  const ua = navigator.userAgent;
  if (/\bMicroMessenger\/([\d.]+)/i.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    function onLoad() {
      setTimeout(() => {
        i.removeEventListener('load', onLoad);
        setTimeout(() => {
          document.body.removeChild(i);
        }, 0);
      }, 0);
    }
    document.body.appendChild(i);
    i.addEventListener('load', onLoad);
  }
}

// 空函数，用于函数参数的回退处理
export function noop() {}
