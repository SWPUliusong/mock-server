<template>
  <div class="menu" :style="{visibility, top, left}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visibility: "hidden",
        top: "0px",
        left: "0px"
      };
    },
    computed: {
      isOpen() {
        return this.visibility === "visible";
      }
    },
    methods: {
      open(x, y) {
        Object.assign(this, {
          visibility: "visible",
          top: x + "px",
          left: y + "px"
        });
      },
      close() {
        this.visibility = "hidden";
      }
    }
  };
</script>

<style scoped lang="less">
.menu {
  position: fixed;
  background-color: #333;
}
</style>
