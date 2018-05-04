<template>
  <span class="create-api">
    <el-button type="primary" icon="el-icon-plus" @click="open">新增API</el-button>

    <el-dialog title="新增API" :visible.sync="dialogFormVisible">
      <el-form :model="params" label-width="80px" :rules="rules" ref="createApiForm">
        <el-form-item label="Tag" prop="tag">
          <el-popover ref="tagInfo" placement="right" width="150" trigger="hover">
            <p>你的api会按照tag进行分类，建议你把有关的api归为同一个tag</p>
          </el-popover>
          <el-autocomplete style="display: block" :fetch-suggestions="querySearch" v-model="params.tag" auto-complete="off">
            <template slot="append">
              <el-button icon="el-icon-info" v-popover:tagInfo></el-button>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="params.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="method" prop="method">
          <el-select style="display: block" v-model="params.method" placeholder="请选择url请求方式">
            <el-option v-for="method in methods" :key="method" :label="method" :value="method"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" :rows="2" v-model="params.description" placeholder="对api接口的一个大致描述" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createApi">确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    data() {
      return {
        dialogFormVisible: false,
        methods: ["GET", "POST", "PUT", "DELETE"],
        params: {
          tag: "",
          url: "",
          method: "GET",
          description: ""
        },
        rules: {
          tag: [{ required: true, message: "请输入tag", trigger: "change" }],
          url: [{ required: true, message: "请输入url", trigger: "blur" }],
          method: [{ required: true, message: "请选择请求方式", trigger: "blur" }]
        }
      };
    },
    computed: {
      ...mapState(["project"])
    },
    methods: {
      querySearch(qs, cb) {
        const { apis } = this.project;
        let result = Object.keys(apis || {}).map(tag => ({ value: tag }));
        result.unshift({ value: "default" });
        if (qs) {
          result = result.filter(api => api.value.indexOf(qs) > -1);
        }
        return cb(result);
      },
      open() {
        this.dialogFormVisible = true;
        let elem = this.$refs["createApiForm"];
        elem && elem.resetFields();
      },
      createApi() {
        this.$refs["createApiForm"].validate(valid => {
          if (valid) {
            this.$store.dispatch("createApi", this.params).then(() => {
              this.dialogFormVisible = false;
            });
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
.create-api {
  text-align: left;
}
</style>

