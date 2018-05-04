<template>
  <el-button-group>
    <el-button type="success" :loading="starting" @click="startServer" :disabled="!startable">
      启动服务器
    </el-button>
    <el-button type="primary" :loading="restarting" @click="restartServer" :disabled="!operable">
      重启服务器
    </el-button>
    <el-button type="danger" :loading="closing" @click="closeServer" :disabled="!operable">
      关闭服务器
    </el-button>
  </el-button-group>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    data() {
      return {
        // 是否正在启动
        starting: false,
        // 是否正在重启
        restarting: false,
        // 是否正在关闭
        closing: false
      };
    },
    computed: {
      ...mapState(["project", "serverInfo"]),
      startable() {
        return !this.serverInfo.id;
      },
      operable() {
        let { id: sid } = this.serverInfo;
        let { id: pid } = this.project;
        return !!sid && pid === sid;
      }
    },
    methods: {
      startServer() {
        let p = null
        this.$prompt("请输入端口", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValidator(port) {
            p = parseInt(port);
            return p > 1023 && p < 49152;
          },
          inputErrorMessage: "端口只能是1024-49151"
        })
          .then(({ value }) => {
            this.starting = true;
            return this.$store.dispatch("startServer", value);
          })
          .catch(err => {
            if (err !== "cancel") {
              this.$notify.error({
                title: "错误",
                message: `端口${p}已被占用`
              });
              return;
            }
          })
          .finally(() => (this.starting = false));
      },
      restartServer() {
        this.restarting = true;
        this.$store
          .dispatch("restartServer")
          .catch(err => {
            if (err !== "cancel") {
              this.$notify.error({
                title: "错误",
                message: err
              });
              return;
            }
          })
          .finally(() => (this.restarting = false));
      },
      closeServer() {
        this.closing = true;
        this.$store
          .dispatch("closeServer")
          .catch(err => {
            if (err !== "cancel") {
              this.$notify.error({
                title: "错误",
                message: err
              });
              return;
            }
          })
          .finally(() => (this.closing = false));
      }
    }
  };
</script>
