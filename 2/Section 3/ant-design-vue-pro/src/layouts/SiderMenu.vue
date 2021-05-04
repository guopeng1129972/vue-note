<template>
  <div style="width: 100%">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      :mode="navStyle"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";

export default {
  components: {
    "sub-menu": SubMenu,
  },
  props: {
    theme: {
      type: String,
      default: "dark",
    },
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    navStyle() {
      let navLayout = this.$route.query.navLayout;
      return navLayout === "left" ? "inline" : "horizontal";
    },
  },
  watch: {
    "$route.path": function (val) {
      (this.selectedKeys = this.selectedKeysMap[val]),
        (this.openKeys = this.collapsed ? [] : this.openKeysMap[val]);
    },
    collapsed: function (val) {
      this.openKeys = val ? [] : this.openKeysMap[this.$route.path];
    },
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      routes.forEach((item) => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path,
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      });
      for (let item in menuData) {
        console.log(menuData[item]);
      }
      return menuData;
    },
  },
};
</script>
