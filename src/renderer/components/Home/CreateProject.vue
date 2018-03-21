<template>
  <span class="create-project">
    <i class="el-icon-plus" @click="dialogFormVisible = true"></i>
    <el-dialog title="创建项目" :visible.sync="dialogFormVisible">
      <el-form :model="project">
        <el-form-item label="项目名称" label-width="80px">
          <el-input v-model="project.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="project.title === ''" @click="createProject">确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script>
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        dialogFormVisible: false,
        project: {
          title: ""
        }
      };
    },
    methods: {
      // ...mapActions(["createProject"]),
      open() {
        this.dialogFormVisible = true
        this.project.title = ""
      },
      createProject() {
        let title = this.project.title
        this.$store.dispatch("createProject", title).then(() => {
          this.dialogFormVisible = false
        }).catch(err => console.log(err))
      }
    }
  };
</script>

<style scoped lang="less">
.create-project {
  display: block;
  .el-icon-plus {
    color: #dfdfdf;
    font-size: 84px;
    line-height: 120px;
  }
}
</style>
