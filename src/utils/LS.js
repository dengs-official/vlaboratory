/*
 * 简化localStorage和sessionStorage操作
 */

export class LS {
  constructor(session = false, prefix = '--', suffix = '--') {
    this.prefix = prefix;
    this.suffix = suffix;
    this.storage = session ? sessionStorage : localStorage;
  }

  _transformKey(key) {
    return this.prefix + key + this.suffix;
  }

  set(key, value) {
    this.storage.setItem(this._transformKey(key), JSON.stringify(value));
  }

  get(key) {
    const item = this.storage.getItem(this._transformKey(key));
    return item === 'undefined' ? undefined : JSON.parse(item);
  }

  remove(key) {
    this.storage.removeItem(this._transformKey(key));
  }

  clear() {
    this.storage.clear();
  }

  key(index) {
    this.storage.key(index);
  }
}
// 添加app名为前缀防止内嵌iframe时相互覆盖
const projectName = `${location.origin}${location.pathname}`;
export const ls = new LS(false, `__${projectName}__`);
export const ss = new LS(true, `__${projectName}__`);
