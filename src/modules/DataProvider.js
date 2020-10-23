export class Pagination {
  static PAGE_NUM = 1
  static PAGE_SIZE = 20

  constructor({pageNum = Pagination.PAGE_NUM, pageSize = Pagination.PAGE_SIZE, total = 0} = {}) {
    this.PAGE_NUM = pageNum;
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
      if (pageNum < this.PAGE_NUM) {
        pageNum = this.PAGE_BEGIN;
      }
      this.pageNum = pageNum;
    }
  }

  reset() {
    this.setPage({
      pageNum: this.PAGE_NUM,
      pageSize: this.PAGE_SIZE,
      total: 0
    });
  }

  hasPrev() {
    return this.pageNum > this.PAGE_NUM;
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
    this.isFetchMore = false;
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
    this.loading = true;
    const p = this.request.api(this.params);
    p.then((res) => {
      const data = res.data;
      const items = data.list || data.items || data.records || [];
      const total = Number(data.totalCount || data.total || items.length || 0);

      this.items = this.isFetchMore ? [...this.items, ...items] : items;
      this.pagination.setPage({total});

      this.request.success && this.request.success(res);
    }).catch((err) => {
      if (!this.isFetchMore) {
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

  setParams(params, override = false, reload = true) {
    if (override) {
      this.params = params;
    } else {
      this.params = {
        ...this.params,
        ...params
      };
    }
    if (reload) {
      return this.reload();
    }
    return Promise.resolve({});
  }

  // 刷新数据并跳转到第一页
  reload() {
    return this.changePage(this.pagination.PAGE_BEGIN);
  }

  // 仅刷新当页数据
  refresh() {
    return this.changePage();
  }

  fetchMore() {
    if (this.hasMore()) {
      this.isFetchMore = true;
      return this.changePage(this.pagination.current + 1).finally(() => {
        this.isFetchMore = false;
      });
    }
    return Promise.reject(new Error('no more data'));
  }

  changePage(current = this.pagination.current, pageSize = this.pagination.pageSize) {
    this.pagination.setPage({current, pageSize});

    this.setParams({
      pageNum: this.pagination.current,
      pageSize: this.pagination.pageSize
    }, false, false);

    return this._getData();
  }

  hasMore() {
    return this.pagination.hasNext();
  }
}
