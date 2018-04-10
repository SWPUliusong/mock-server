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
        this.closePrev()

        menu = this.$refs["menu"];
        menu.open(e.clientY, e.clientX);
      };

      document.addEventListener("click", this.closePrev);
      document.addEventListener("mousewheel", this.closePrev);
    },
    methods: {
      closePrev() {
        if (menu && menu.isOpen) {
          menu.close();
        }
      }
    }
  };
</script>
