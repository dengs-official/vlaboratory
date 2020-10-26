<template>
  <div class="base-card flex flex-vertical">
    <header class="base-card-header flex flex-middle">
      <h3>{{title}}</h3>
      <div class="flex-item-1"></div>
      <slot name="headerExtra">
        <a-icon type="smile" />
      </slot>
    </header>
    <div class="base-card-content flex-item-1">
      <slot />
    </div>
    <footer class="base-card-footer flex flex-center">
      <slot name="footerExtra">@</slot>
    </footer>
  </div>
</template>

<script>
/**
 * base card 组件，定义一个card的基本架构
 */
export default {
  name: 'base-card',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="less" scoped>
@import (reference) './variables.less';
.base-card {
  width: fit-content;
  background-color: @white;
  box-shadow: 1px 1px 10px @color-border;
  border-radius: @border-radius;
  margin: 10px;
  &-header,
  &-footer {
    padding: 10px;
  }
  &-header {
    background-color: @blue-20;
    border-radius: @border-radius;
  }
  &-footer {
    color:@color-text-sub;
    font-size: @fs-lg;
    border-top: 1px solid @color-border;
  }
}
</style>
