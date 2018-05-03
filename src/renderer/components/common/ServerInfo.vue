<template>
  <div class="server">
    <span class="tip" v-if="!serverInfo.id">当前没有启动服务器</span>
    <span class="tip click" @click="isShowLog=!isShowLog" v-else>服务器已启动</span>

    <transition name="side">
      <ul class="server-logger scrollbar" v-if="!!serverInfo.id && isShowLog" @mousewheel.stop="()=> false">
        <li>
          <h4 style="padding: 10px 0;">
            <span>项目名称：{{serverName}}</span>&emsp;
            <span>项目id：{{serverInfo.id}}</span>&emsp;
            <span>启动端口：{{serverInfo.port}}</span>
          </h4>
        </li>
        <li v-for="logger in serverInfo.loggers" :key="logger.time">
          <pre class="logger-item">{{formatTime(logger.time)}} <span :class="[isSuccess(logger.log), isError(logger.log)]">{{logger.log.trim()}}</span></pre>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import moment from "moment";

  export default {
    data() {
      return {
        isShowLog: false
      };
    },
    computed: {
      ...mapState(["serverInfo", "projects"]),
      serverName() {
        if (!this.projects) {
          return "";
        }
        let arr = this.projects.filter(item => item.id == this.serverInfo.id);
        return arr[0].title;
      }
    },
    methods: {
      isSuccess(str) {
        return /\s200\s/.test(str) ? "success" : null;
      },
      isError(str) {
        return /\s(404|500)\s/.test(str) ? "error" : null;
      },
      formatTime(time) {
        return moment(time).format("HH:mm:ss");
      }
    },
    watch: {
      "serverInfo.loggers": function(loggers) {
        console.log(loggers.length);
      }
    }
  };
</script>

<style lang="less" scoped>
@bg: rgba(25, 25, 25, 0.8);
.server {
  position: fixed;
  bottom: 0;
  right: 0;
  .tip {
    background: @bg;
    display: inline-block;
    color: #fff;
    padding: 5px;
    font-size: 14px;
    &.click {
      cursor: pointer;
    }
  }
}
.server-logger {
  background: @bg;
  color: #ffffff;
  width: 420px;
  height: 360px;
  overflow-y: auto;
  padding: 10px;
  .logger-item {
    font-size: 16px;
    .success {
      color: #00ff00;
    }
    .error {
      color: #ff0000;
    }
  }
}
.side-enter-active,
.side-leave-active {
  transition: all 0.5s;
  overflow: hidden;
}
.side-enter,
.side-leave-to {
  width: 94px;
  height: 0;
}
</style>