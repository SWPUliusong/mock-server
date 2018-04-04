<template>
  <div class="menu" :style="{display, top, left}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        display: "none",
        top: "0px",
        left: "0px"
      };
    },
    methods: {
      open(x, y) {
        Object.assign(this, {
          display: "block",
          top: x + "px",
          left: y + "px"
        });
      },
      close() {
        this.display = "none";
      }
    }
  };
</script>

