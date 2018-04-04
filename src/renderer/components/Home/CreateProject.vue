<template>
  <span class="create-project">
    <i class="el-icon-plus" @click="open"></i>
    <el-dialog title="创建项目" :visible.sync="dialogFormVisible">
      <el-form :model="project" :rules="rules" ref="createProject">
        <el-form-item label="项目名称" label-width="80px" prop="title">
          <el-input @keydown.native.enter="createProject" v-model="project.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="project.title.trim() === ''" @click="createProject">确 定</el-button>
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
        },
        rules: {
          title: [
            {
              trigger: "blur",
              validator: (rule, value, callback) => {
                let titles = this.$store.state.projects.map(item => item.title)
                if(titles.indexOf(value.trim()) > -1) {
                  return callback(new Error("项目已存在！！！"));
                }
                return callback()
              }
            }
          ]
        }
      };
    },
    methods: {
      open() {
        this.dialogFormVisible = true;
        let component = this.$refs["createProject"];
        component && component.resetFields();
      },
      createProject() {
        let title = this.project.title.trim();
        this.$refs["createProject"].validate(valid => {
          if (!valid) return;

          this.$store
            .dispatch("createProject", title)
            .then(() => {
              this.dialogFormVisible = false;
            })
            .catch(err => console.log(err));
        });
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
