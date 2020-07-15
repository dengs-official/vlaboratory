<template>
  <a-layout hasSider>
    <a-layout-sider
      collapsible
      v-model="sider.collapsed"
      :trigger="null"
    >
      <div class="logo" />
      <a-menu
        mode="inline"
        theme="dark"
        :selectedKeys="menu.selectedKeys"
      >
        <a-menu-item
          v-for="item in menu.options"
          :key="item.key"
          @click="onMenuItemClick(item.key)"
        >
          <a-icon :type="item.icon" />
          <span>{{item.title}}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-icon
          class="trigger"
          :type="sider.collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (sider.collapsed = !sider.collapsed)"
        />
      </a-layout-header>
      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>

const menuOptions = [{
  key: 'home',
  title: 'Home',
  icon: 'home',
}, {
  key: 'about',
  title: 'About',
  icon: 'info-circle',
}];

export default {
  data() {
    return {
      menu: {
        options: menuOptions,
        selectedKeys: [],
      },
      sider: {
        collapsed: false,
      },

    };
  },
  methods: {
    onMenuItemClick(key) {
      this.menu.selectedKeys[0] !== key && this.$router.push({name: key});

      this._setSelectedKeys(key);
    },
    _setSelectedKeys(key) {
      this.menu.selectedKeys = [key];
    },
  },
  created() {
    this._setSelectedKeys(this.menu.options[0].key);
  },

};
</script>

<style lang="less" scoped>
.ant-layout {
  height: 100%;
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
  .ant-layout-header {
     background: #fff;
     padding: 0;
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
    }
    .trigger:hover {
      color: #1890ff;
    }
  }
  .ant-layout-content {
    margin: 12px;
    padding: 12px;
    background-color: #fff;
  }

}

</style>
