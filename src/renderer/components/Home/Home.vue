<template>
  <div>
    <div class="search-input">
      <el-input prefix-icon="el-icon-search" @input="filterProjects(input)" v-model="input" placeholder="请输入项目名称,按下Enter筛选"></el-input>
    </div>
    <ul class="project-list">
      <li class="project-item" is="router-link" :to="`/projects/${project.id}`" v-for="project in projects" :key="project.id">
        <ContextMenu>
          <span class="project-icon">
            <i class="iconfont icon-xiangmu"></i>
          </span>
          <span class="project-title" :title="project.title">{{project.title}}</span>

          <el-menu mode="vertical" slot="menu" class="project-menu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1" @click.native.prevent="openRenameModal(project)">
              <i class="el-icon-edit"></i>
              <span slot="title">重命名</span>
            </el-menu-item>
            <el-menu-item index="2" @click.native.prevent="deleteProject(project.id)">
              <i class="el-icon-delete"></i>
              <span slot="title">删除</span>
            </el-menu-item>
          </el-menu>
        </ContextMenu>
      </li>
      <li class="project-item project-add">
        <CreateProject />
      </li>
    </ul>

    <!-- 项目重命名 -->
    <el-dialog title="重命名" :visible.sync="dialogFormVisible">
      <el-form :model="project" :rules="rules" ref="renameProject">
        <el-form-item label="项目名称" label-width="80px" prop="title">
          <el-input @keydown.native.enter="renameProject" v-model="project.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="project.title.trim() === ''" @click="renameProject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import CreateProject from "./CreateProject";
  import ContextMenu from "../common/ContextMenu";
  import _ from "lodash";

  export default {
    components: { CreateProject, ContextMenu },
    data() {
      return {
        input: "",
        dialogFormVisible: false,
        project: {
          id: "",
          title: ""
        },
        rules: {
          title: [
            {
              trigger: "blur",
              validator: (rule, value, callback) => {
                let titles = this.$store.state.projects.map(item => item.title);
                if (titles.indexOf(value.trim()) > -1) {
                  return callback(new Error("项目名已存在！！！"));
                }
                return callback();
              }
            }
          ]
        }
      };
    },
    computed: { ...mapGetters(["projects"]) },
    created() {
      this.$store.dispatch("findProjects");
    },
    methods: {
      ...mapActions(["filterProjects", "deleteProject"]),
      openRenameModal(project) {
        this.dialogFormVisible = true;
        this.project = _.clone(project);
        this.$refs["renameProject"].resetFields();
      },
      renameProject() {
        let title = this.project.title.trim();
        this.$refs["renameProject"].validate(valid => {
          if (!valid) return;

          this.$store
            .dispatch("renameProject", this.project)
            .then(() => {
              this.dialogFormVisible = false;
            })
            .catch(err => console.log(err));
        });
      }
    }
  };
</script>

<style lang="less" scoped>
@color: #797979;
.search-input {
  padding: 30px;
}
.project-list {
  padding: 0 30px;
  .project-item {
    float: left;
    text-align: center;
    width: 120px;
    height: 120px;
    cursor: pointer;
    overflow: hidden;
    &:hover {
      text-decoration: none;
      background-color: @color;
      border-radius: 8px;
      color: #fff;
      & .project-icon {
        color: #fff;
      }
    }
  }
  &::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }
}
.project-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  font-size: 16px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-weight: bold;
  text-align: center;
}
.project-icon {
  display: block;
  color: @color;
  height: 96px;
  line-height: 96px;
  transition: color 0.4s;
  .iconfont {
    font-size: 72px;
  }
}
@h: 42px;
.project-menu {
  text-align: left;
  .el-menu-item {
    line-height: @h;
    height: @h;
  }
}
</style>
