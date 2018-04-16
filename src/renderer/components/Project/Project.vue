<template>
  <div class="project">
    <el-row class="project-header">
      <el-col :span="2">
        <span class="el-icon-arrow-left back" @click="$router.replace('/')"></span>
      </el-col>
      <el-col :span="18" class="project-title" :title="project.title">
        {{project.title}}
      </el-col>
      <el-col :span="4" style="line-height: 56px;">
        <el-button type="success">启动服务器</el-button>
      </el-col>
    </el-row>
    <el-row class="project-option">
      <el-col :span="4">
        <el-switch v-model="flag" @change="collapseAll" /> {{flag?'折叠':'展开'}}所有标签
      </el-col>
      <el-col :span="20" class="project-btn">
        <CreateApi />
      </el-col>
    </el-row>
    <el-collapse :value="collapse">
      <el-collapse-item v-for="(apis, tag) of project.apis" :key="tag" :name="tag">
        <template slot="title">
          <strong style="font-size: 20px;">{{tag}}</strong>
        </template>
        <el-collapse>
          <el-collapse-item v-for="(api, index) of apis" :key="api.url">
            <template slot="title">
              <strong class="api-url">
                <span style="color: #999">{{api.method}}</span>&nbsp;{{api.url}}
              </strong>
              <UpdateApi class="api-opt" :api="api" :tag="tag" :index="index"></UpdateApi>
              <span class="api-opt" @click.stop="deleteApi(tag, index)">
                <i class="el-icon-delete"></i>
              </span>
              <span class="api-desc" :title="api.description">{{api.description}}</span>
            </template>
            <div class="api-schema">
              <strong>API将按以下格式生成数据: </strong>
              <p class="show-schema">
                <pre>{{formatSchema(api.schema)}}</pre>
                <router-link :to="`/tags/${tag}/schema/${index}`">
                  <el-button class="schema-edit" type="info" icon="el-icon-edit">修改Schema</el-button>
                </router-link>
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import _ from "lodash";
  import CreateApi from "./CreateApi";
  import UpdateApi from "./UpdateApi";
  import { formatSchema } from "./util";

  export default {
    components: { CreateApi, UpdateApi },
    data() {
      return {
        flag: true,
        collapse: []
      };
    },
    created() {
      const { id } = this.$route.params;
      this.findProjectById(id).then(() => {
        this.collapse = Object.keys(this.project.apis);
      });
    },
    computed: {
      ...mapState(["project"])
    },
    methods: {
      formatSchema,
      ...mapActions(["findProjectById"]),
      collapseAll(val) {
        if (val) {
          this.collapse = Object.keys(this.project.apis);
        } else {
          this.collapse = [];
        }
      },
      deleteApi(tag, index) {
        if (confirm("确认删除此api?")) {
          this.$store.dispatch("deleteApi", { tag, index }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        } else {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        }
      }
    }
  };
</script>

<style lang="less" scoped>
@h: 56px;
@c: #409eff;
.project {
  padding: @h 30px;
}
.project-header {
  height: @h;
  background: @c;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  .back {
    line-height: @h;
    color: #ffffff;
    height: 100%;
    padding: 0 18px;
    font-size: 20px;
    cursor: pointer;
    border-right: 1px solid #dfdfdf;
  }
}
.project-title {
  color: #ffffff;
  text-align: center;
  line-height: @h;
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@opt-h: 40px;
.project-option {
  margin: 15px 0;
  height: @opt-h;
  line-height: @opt-h;
}
.project-btn {
  text-align: right;
}
.api-url {
  padding-left: 15px;
  font-size: 16px;
  display: inline-block;
  height: 100%;
  border-left: 5px solid #999;
}

.api-opt {
  float: right;
  padding: 0 5px;
}

.api-desc {
  font-size: 16px;
  float: right;
  padding-right: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 40%;
  color: #999;
  text-align: right;
}

.api-schema {
  padding: 15px 0 0 15px;
}
.show-schema {
  position: relative;
  border: 1px solid #989898;
  border-radius: 3px;
  font-size: 16px;
  box-shadow: inset 0 0 8px rgba(23, 23, 23, 0.6);
  padding: 10px;
}
.schema-edit {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
