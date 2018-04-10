<template>
  <span class="update-api" index="1" @click.stop="open">
    <i class="el-icon-edit"></i>

    <el-dialog title="修改API" :visible.sync="dialogFormVisible">
      <el-form :model="params" label-width="80px" :rules="rules" ref="updateApiForm">
        <el-form-item label="Tag">
          <el-popover ref="tagInfo" placement="right" width="150" trigger="hover">
            <p>你的api会按照tag进行分类，建议你把有关的api归为同一个tag</p>
          </el-popover>
          <el-input :value="tag" disabled auto-complete="off">
            <template slot="append">
              <el-button icon="el-icon-info" v-popover:tagInfo></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="params.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="method" prop="method">
          <el-select style="display: block" v-model="params.method" placeholder="请选择url请求方式">
            <el-option v-for="method in methods" :key="method" :label="method" :value="method"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :rows="2" v-model="params.description" placeholder="对api接口的一个大致描述" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.stop="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.stop="updateApi">确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script>
  import { mapState } from "vuex";
  import _ from "lodash";
  export default {
    data() {
      return {
        dialogFormVisible: false,
        methods: ["GET", "POST", "PUT", "DELETE"],
        params: {
          tag: "default",
          url: "",
          method: "GET",
          description: ""
        },
        rules: {
          url: [{ required: true, message: "请输入url", trigger: "blur" }],
          method: [{ required: true, message: "请选择请求方式", trigger: "blur" }]
        }
      };
    },
    props: ["api", "tag", "index"],
    computed: {
      ...mapState(["project"])
    },
    methods: {
      open() {
        this.dialogFormVisible = true;
        this.params = _.pick(this.api, ["url", "method", "description"]);
      },
      updateApi() {
        this.$refs["updateApiForm"].validate(valid => {
          if (valid) {
            const { tag, index } = this;
            this.$store
              .dispatch("updateApi", { tag, index, ...this.params })
              .then(() => {
                this.dialogFormVisible = false;
              });
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
.update-api {
  text-align: left;
}
</style>

