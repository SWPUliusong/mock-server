<template>
  <span>
    <el-button type="success" @click="open()">启动服务器</el-button>

    <el-dialog title="启动服务器" :visible.sync="dialogFormVisible">
      <el-form :model="params">
        <el-form-item label="端口" label-width="80px">
          <el-input v-model="params.port" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="端口" label-width="80px">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        dialogFormVisible: false,
        params: {
          port: 3000
        }
      };
    },
    methods: {
      isPortValid(port) {
        port = parseInt(port);
        return port > 1023 && port < 49152;
      },
      open() {
        this.dialogFormVisible = true;
      }
    }
  };
</script>
