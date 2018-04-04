<template>
  <div class="contextmenu">
    <div ref="contextmenu">
      <slot></slot>
    </div>
    <Menu ref="menu">
      <slot name="menu"></slot>
    </Menu>
  </div>
</template>

<script>
  import Menu from "./menu";
  let menu = null;

  export default {
    components: { Menu },
    mounted() {
      this.$refs["contextmenu"].oncontextmenu = e => {
        if (menu) {
          menu.close();
        }

        menu = this.$refs["menu"];
        menu.open(e.pageY, e.pageX);
      };

      document.onclick = () => {
        if (!menu) return;
        menu.close();
      };
    },
    data() {
      return {
        style: {
          display: "none",
          top: "0px",
          left: "0px"
        }
      };
    }
  };
</script>

<style scoped lang="less">
.menu {
  position: fixed;
  background-color: #333;
}
</style>

