<template>
  <div class="layout flex flex-vertical rel">
    <router-view></router-view>
    <van-tabbar v-model="tabs.active">
      <van-tabbar-item
        v-for="item in tabs.options"
        :key="item.name"
        :name="item.name"
        :icon="item.icon"
      >
        {{item.label}}
      </van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
const tabOpts = [{
  name: 'home',
  label: 'Home',
  icon: 'home-o'
}, {
  name: 'user',
  label: 'User',
  icon: 'friends-o'
}, {
  name: 'setting',
  label: 'Setting',
  icon: 'setting-o'
}];

export default {
  data() {
    return {
      tabs: {
        options: tabOpts,
        active: 'home',
      },
    };
  },
  created() {
  },
  methods: {
  },

};
</script>

<style lang="less" scoped>
.layout {
  min-height: 100vh;
}
</style>
