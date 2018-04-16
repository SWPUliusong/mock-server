<template>
  <div class="schema">
    <el-row class="api-header">
      <el-col :span="2">
        <span class="el-icon-arrow-left back" @click="$router.back()"></span>
      </el-col>
      <el-col :span="17" class="api-title" :title="api.url">
        {{api.url}}
      </el-col>
      <el-col :span="3" style="line-height: 56px">
        <el-button :type="btn[api.method]">method: {{api.method}}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" :offset="1" style="padding: 15px;">
        <el-row class="field-row" style="text-align: right;">
          <EditSchema>
            <i class="el-icon-plus"></i> 新增字段</EditSchema>
        </el-row>
        <el-row v-if="isEmpty">
          <el-col :span="7">
            <el-input placeholder="字段名" disabled></el-input>
          </el-col>
          <el-col :offset="1" :span="16">
            <el-cascader style="width:100%" placeholder="字段类型" :options="options" disabled>
            </el-cascader>
          </el-col>
        </el-row>
        <el-row class="field-row" v-else v-for="(schemaValue, key) of schema" :key="key">

          <template v-if="schemaValue.__type__">
            <!-- 数组 -->
            <el-row v-if="schemaValue.__type__ === 'array'">
              <el-row class="field-row">
                <el-col :span="6">
                  <el-input :value="key" disabled></el-input>
                </el-col>
                <el-col :offset="1" :span="12">
                  <el-input :value="Types[schemaValue.__type__]" disabled></el-input>
                </el-col>
                <el-col :span="5" style="line-height: 40px; text-align: right;">
                  <EditSchema size="mini" :field="{key, schemaValue}">修改</EditSchema>
                  <el-button type="danger" size="mini" @click="deleteField(key)">删除</el-button>
                </el-col>
              </el-row>
              <el-row class="field-row">
                <el-col :span="17">
                  <el-cascader :value="schemaValue.value" style="width:100%" :options="options" disabled>
                  </el-cascader>
                </el-col>
                <el-col :offset="1" :span="6" style="text-align:right">
                  <el-input-number :value="schemaValue.len" :min="1" :max="50" label="数组长度" disabled>
                  </el-input-number>
                </el-col>
              </el-row>
            </el-row>

            <!-- 对象、集合 -->
            <el-row v-else>
              <el-row class="field-row">
                <template v-if="schemaValue.__type__ !== 'object'">
                  <el-col :span="4">
                    <el-input :value="key" disabled></el-input>
                  </el-col>
                  <el-col :offset="1" :span="7">
                    <el-input :value="Types[schemaValue.__type__]" disabled></el-input>
                  </el-col>
                  <el-col :offset="1" :span="6">
                    <el-input-number :value="schemaValue.len" disabled></el-input-number>
                  </el-col>
                </template>
                <template v-else>
                  <el-col :span="6">
                    <el-input :value="key" disabled></el-input>
                  </el-col>
                  <el-col :offset="1" :span="12">
                    <el-input :value="Types[schemaValue.__type__]" disabled></el-input>
                  </el-col>
                </template>
                <el-col :span="5" style="line-height: 40px; text-align: right;">
                  <EditSchema size="mini" :field="{key, schemaValue}">修改</EditSchema>
                  <el-button type="danger" size="mini" @click="deleteField(key)">删除</el-button>
                </el-col>
              </el-row>
              <el-row class="field-row" v-for="(childValue, childKey) of safeObj(schemaValue)" :key="childKey">
                <el-col :span="6">
                  <el-input :value="childKey" disabled></el-input>
                </el-col>
                <el-col :offset="1" :span="17">
                  <el-cascader :value="childValue" style="width:100%" :options="options" disabled>
                  </el-cascader>
                </el-col>
              </el-row>
            </el-row>
          </template>
          <template v-else>
            <el-col :span="6">
              <el-input :value="key" disabled></el-input>
            </el-col>
            <el-col :offset="1" :span="12">
              <el-cascader style="width:100%" :options="options" :value="schemaValue" disabled>
              </el-cascader>
            </el-col>
            <el-col :span="5" style="line-height: 40px; text-align: right;">
              <EditSchema size="mini" :field="{key, schemaValue}">修改</EditSchema>
              <el-button type="danger" size="mini" @click="deleteField(key)">删除</el-button>
            </el-col>
          </template>

        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import EditSchema from "./EditSchema";
  import options from "./options";
  import _ from "lodash";
  import { Types } from "./model";

  export default {
    components: { EditSchema },
    data() {
      return {
        options,
        btn: {
          GET: "primary",
          POST: "success",
          PUT: "warning",
          DELETE: "danger"
        },
        Types,
        dialogFormVisible: false
      };
    },
    computed: {
      ...mapState(["project", "api"]),
      schema() {
        if (!this.api) return {};
        return _.cloneDeep(this.api.schema);
      },
      isEmpty() {
        return Object.keys(this.schema).length === 0;
      }
    },
    created() {
      if (!this.project.id) {
        return this.$router.back();
      }
      const { tag, index } = this.$route.params;
      this.findApi({ tag, index });
    },
    methods: {
      ...mapActions(["findApi"]),
      // 过滤出模板遍历需要的属性
      safeObj(obj) {
        let { __type__: type, ...result } = obj;
        if (type === "object") {
          return result;
        }
        let { value, len } = result;
        return value;
      },
      deleteField(key) {
        this.$confirm("确定删除该字段, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return this.$store.dispatch("deleteField", { key });
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  };
</script>

<style lang="less" scoped>
@h: 56px;
@c: #409eff;
.schema {
  padding: @h 30px;
  padding-top: @h + 15px;
}
.api-header {
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
.api-title {
  color: #ffffff;
  text-align: center;
  line-height: @h;
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.field-row {
  padding-bottom: 15px;
}
</style>
