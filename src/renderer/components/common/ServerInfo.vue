<template>
  <div class="server">
    <span class="tip" v-if="!serverInfo.id">当前没有启动服务器</span>
    <span class="tip" v-else>服务器已启动</span>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex"

  export default {
    data() {
      return {
        dialogFormVisible: false,
        params: {
          port: 3000
        }
      };
    },
    computed: {
      ...mapState(["serverInfo"])
    },
    methods: {

    }
  };
</script>

<style lang="less" scoped>
  .server {
    position: fixed;
    bottom: 0;
    right: 0;
    .tip {
      display: inline-block;
      background: rgba(25, 25, 25, 0.8);
      color: #fff;
      padding: 5px;
      cursor: pointer;
      font-size: 14px;
    }
  }
</style>