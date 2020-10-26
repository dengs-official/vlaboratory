<template>
  <a-select
    class="v-data-select"
    v-bind="attrs"
    v-on="$listeners"
    @focus="onFocus"
    @popupScroll="onScroll"
    @search="onSearch"
  >
    <template v-for="item in slots" #[item]="slotProps">
      <slot :name="item" v-bind="slotProps">
      </slot>
    </template>
    <!-- <slot /> -->
  </a-select>
</template>

<script>
import {debounce} from '@/utils/index.js';

export default {
  inheritAttrs: false,
  name: 'v-data-select',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    dp: {
      type: Object,
      required: true,
    },
    fomatter: {
      type: Object,
      default: () => ({
        value: '',
        search: '',
      })
    }
  },
  data() {
    this.onSearch = debounce(this.onSearch);
    return {

    };
  },
  computed: {
    attrs() {
      const attrs = {
        filterOption: false,
        notFoundContent: (props) => {
          return this.dp.loading ? <span>搜索中...</span> : <span>无内容</span>;
        },
        getPopupContainer: (triggerNode) => triggerNode.parentNode,
      };
      const mergeAttrs = {
        options: this.dp.items
      };
      return {...attrs, ...mergeAttrs, ...this.$attrs};
    },
    slots() {
      return Object.keys({
        ...{
          // suffixIcon: ''
        },
        ...this.$slots,
        ...this.$scopedSlots
      });
    },
  },
  methods: {
    onFocus() {
      if (!this.dp.items.length) {
        this.dp.fetch();
      }
    },
    onScroll(e) {
      const {scrollHeight, offsetHeight, scrollTop} = e.target;
      if (scrollHeight - offsetHeight - scrollTop < 1) {
        this.dp.fetchMore();
      }
    },
    onSearch(value) {
      this.dp.fetch();
    }
  }
};
</script>

<style lang="less" scoped>

</style>
