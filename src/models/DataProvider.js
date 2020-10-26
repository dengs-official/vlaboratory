export class Pagination {
  static PAGE_START = 1
  static PAGE_SIZE = 20

  constructor({pageNum = Pagination.PAGE_START, pageSize = Pagination.PAGE_SIZE, total = 0} = {}) {
    this.PAGE_START = pageNum;
    this.PAGE_SIZE = pageSize;

    this.setPage({pageNum, pageSize, total});
  }

  setPage({pageNum, pageSize, total} = {}) {
    if (typeof pageSize !== 'undefined') {
      this.pageSize = pageSize > 0 ? pageSize : 1;
    }
    if (typeof total !== 'undefined') {
      this.total = total >= 0 ? total : 0;
    }
    if (typeof pageNum !== 'undefined') {
      const pageCount = this.pageCount();
      if (pageNum > pageCount) {
        pageNum = pageCount;
      }
      if (pageNum < this.PAGE_START) {
        pageNum = this.PAGE_START;
      }
      this.pageNum = pageNum;
    }
  }

  reset() {
    this.setPage({
      pageNum: this.PAGE_START,
      pageSize: this.PAGE_SIZE,
      total: 0
    });
  }

  hasPrev() {
    return this.pageNum > this.PAGE_START;
  }

  hasNext() {
    return this.pageNum < this.pageCount();
  }

  pageCount() {
    return Math.ceil(this.total / this.pageSize);
  }
}

export default class DataProvider {
  constructor(config) {
    this.isMore = true;
    this.loading = false;
    this.pagination = new Pagination(config.pagination);
    this.items = [];
    this.params = {
      pageNum: this.pagination.pageNum,
      pageSize: this.pagination.pageSize,
      ...config.params
    };
    this.request = config.request;
    if (!this.request || !this.request.api) {
      throw new Error('need request.api for DataProvider');
    }
  }

  _getData() {
    console.log(this.params);
    this.loading = true;
    const p = this.request.api(this.params);
    p.then((res) => {
      const data = res.data;
      const items = data.list || data.items || data.records || [];
      const total = Number(data.totalCount || data.total || items.length || 0);

      this.items = this.isMore ? [...this.items, ...items] : items;
      this.pagination.setPage({total});

      this.request.success && this.request.success(res);
    }).catch((err) => {
      if (!this.isMore) {
        this.items = [];
        this.pagination.reset();
      }

      this.request.fail && this.request.fail(err);
    }).finally((res) => {
      this.loading = false;

      this.request.final && this.request.final(res);
    });
    return p;
  }

  fetch(params) {
    this.params = {...this.params, ...params};
    this.isMore = false;
    this.pagination.setPage({pageNum: this.pagination.PAGE_START});
    return this._getData();
  }

  fetchMore() {
    if (this.pagination.hasNext()) {
      this.isMore = true;
      this.pagination.setPage({pageNum: this.pagination.pageNum + 1});
      return this._getData();
    }
    return Promise.reject(new Error('no more data'));
  }
}
