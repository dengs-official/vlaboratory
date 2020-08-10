<template>
  <section class="layout flex flex-vertical rel">
    <van-nav-bar
      v-bind="nav.attrs"
      v-on="nav.listeners"
    >
      <template #right>
        <van-icon
          :name="nav.attrs.rightIcon"
          @click="nav.listeners.clickRight"
        />
      </template>
    </van-nav-bar>
    <router-view></router-view>
    <van-tabbar
      v-model="tabs.selected"
      v-on="tabs.listeners"
    >
      <van-tabbar-item
        v-for="item in tabs.attrs.options"
        :key="item.name"
        :name="item.name"
        :icon="item.icon"
      >
        {{item.label}}
      </van-tabbar-item>
    </van-tabbar>
  </section>

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
        selected: 'home',
        attrs: {
          options: tabOpts,
        },
        listeners: {
          change: this.onTabChange
        }

      },
    };
  },
  computed: {
    nav() {
      const title = this.tabs.attrs.options.filter((item) => (item.name === this.tabs.selected))[0].label;
      return {
        attrs: {
          title,
          leftArrow: true,
          rightIcon: 'search',

        },
        listeners: {
          clickLeft: this.onClickLeft,
          clickRight: this.onClickRight
        }
      };
    }
  },
  created() {
  },
  methods: {
    onClickLeft() {

    },
    onClickRight() {

    },
    onTabChange(name) {
      this.$router.push({
        name,
      });
    }
  },

};
</script>

<style lang="less" scoped>
.layout {
  // min-height: 100vh;
}
</style>
