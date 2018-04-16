<template>
  <span class="edit-schema">
    <el-button :size="size" type="primary" @click="open">
      <slot></slot>
    </el-button>

    <el-dialog :title="title" :visible.sync="dialogVisible" width="70%">
      <el-row class="field-row" style="text-align:center">
        <strong style="line-height: 40px">字段类型: &emsp;</strong>
        <el-radio-group v-model="params.type" :disabled="!!field">
          <el-radio-button v-for="(type, label) of types" :key="label" :label="label">{{type}}</el-radio-button>
        </el-radio-group>
      </el-row>

      <!-- 新增字段为普通键值对 -->
      <el-row class="field-row" v-if="params.type==='plain'">
        <el-col :span="8">
          <el-input v-model="params.key" placeholder="请输入字段名" :disabled="!!field"></el-input>
        </el-col>
        <el-col :offset="1" :span="15">
          <el-cascader v-model="params.value" placeholder="请选择字段值" style="width:100%" :options="options">
          </el-cascader>
        </el-col>
      </el-row>

      <!-- 新增字段为数组 -->
      <el-row class="field-row" v-if="params.type==='array'">
        <el-col :span="6">
          <el-input v-model="params.key" placeholder="请输入字段名" :disabled="!!field"></el-input>
        </el-col>
        <el-col :offset="1" :span="8">
          <el-cascader v-model="params.value" placeholder="请选择数组元素值" style="width:100%" :options="options">
          </el-cascader>
        </el-col>
        <el-col :offset="1" :span="8" style="text-align:right">
          <el-input-number v-model="params.len" :min="1" :max="50" label="数组长度">
          </el-input-number>
        </el-col>
      </el-row>

      <!-- 新增字段为对象 -->
      <el-row class="field-row" v-if="params.type==='object'">
        <el-row class="field-row">
          <el-input v-model="params.key" placeholder="请输入字段名" :disabled="!!field"></el-input>
        </el-row>
        <el-row class="field-row">
          <h4 class="field-row">新增子字段</h4>
          <el-col :span="7">
            <el-input v-model="childFeild.key" placeholder="请输入子字段名"></el-input>
          </el-col>
          <el-col :offset="1" :span="13">
            <el-cascader v-model="childFeild.value" placeholder="请选择子字段值" style="width:100%" :options="options">
            </el-cascader>
          </el-col>
          <el-col :span="3" style="line-height: 40px; text-align: right;">
            <el-button type="primary" size="small" @click="createChildFeild">确定</el-button>
          </el-col>
        </el-row>
        <h4 class="field-row">子字段结构</h4>
        <el-row class="field-row" v-for="(value, key) of params.obj" :key="key">
          <el-col :span="7">
            <el-input :value="key" placeholder="请输入字段名" disabled></el-input>
          </el-col>
          <el-col :offset="1" :span="13">
            <el-cascader :value="value" placeholder="请选择字段值" style="width:100%" :options="options" disabled>
            </el-cascader>
          </el-col>
          <el-col :span="3" style="line-height: 40px; text-align: right;">
            <el-button type="danger" size="small" @click="deleteChildFeild(key)">删除</el-button>
          </el-col>
        </el-row>
      </el-row>

      <!-- 新增字段为集合 -->
      <el-row class="field-row" v-if="params.type==='collection'">
        <el-row class="field-row">
          <el-col :span="15">
            <el-input v-model="params.key" placeholder="请输入字段名" :disabled="!!field"></el-input>
          </el-col>
          <el-col :offset="1" :span="8" style="text-align:right">
            <el-input-number v-model="params.len" :min="1" :max="50" label="集合长度">
            </el-input-number>
          </el-col>
        </el-row>
        <el-row class="field-row">
          <h4 class="field-row">新增单个元素子字段</h4>
          <el-col :span="7">
            <el-input v-model="childFeild.key" placeholder="请输入子字段名"></el-input>
          </el-col>
          <el-col :offset="1" :span="13">
            <el-cascader v-model="childFeild.value" placeholder="请选择子字段值" style="width:100%" :options="options">
            </el-cascader>
          </el-col>
          <el-col :span="3" style="line-height: 40px; text-align: right;">
            <el-button type="primary" size="small" @click="createChildFeild">确定</el-button>
          </el-col>
        </el-row>
        <h4 class="field-row">集合单个元素子字段结构</h4>
        <el-row class="field-row" v-for="(value, key) of params.obj" :key="key">
          <el-col :span="7">
            <el-input :value="key" placeholder="请输入字段名" disabled></el-input>
          </el-col>
          <el-col :offset="1" :span="13">
            <el-cascader :value="value" placeholder="请选择字段值" style="width:100%" :options="options" disabled>
            </el-cascader>
          </el-col>
          <el-col :span="3" style="line-height: 40px; text-align: right;">
            <el-button type="danger" size="small" @click="deleteChildFeild(key)">删除</el-button>
          </el-col>
        </el-row>
      </el-row>

      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :disabled="disabledSubmit" type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import options from "./options";
  import { ChildFeild, Params, Types, getParams } from "./model";
  import _ from "lodash";

  export default {
    props: ["size", "field"],
    data() {
      return {
        dialogVisible: false,
        params: new Params(),
        // 字段为对象或集合时，新增子字段
        childFeild: new ChildFeild(),
        // 可选的字段值
        options: options,
        title: "新增字段",
        types: Types
      };
    },
    computed: {
      ...mapState(["project", "api"]),
      disabledSubmit() {
        if (!this.dialogVisible) {
          return true;
        }
        const { type, key, value, obj } = this.params;
        if (type === "object" || type === "collection") {
          return !key || Object.keys(obj).length === 0;
        } else {
          return !key || (value && value.length === 0);
        }
      }
    },
    created() {
      if (this.field) {
        let params = getParams(this.field);
        Object.assign(this.params, params);
        this.title = "修改字段";
      }
    },
    methods: {
      ...mapActions(["findApi"]),
      open() {
        this.dialogVisible = true;
        if (this.field) return;
        this.params = new Params();
      },
      // 新增子字段
      createChildFeild() {
        const { key, value } = this.childFeild;
        const obj = _.clone(this.params.obj);
        obj[key] = value;
        this.params.obj = obj;
        this.childFeild = new ChildFeild();
      },
      // 删除子字段
      deleteChildFeild(key) {
        let obj = _.clone(this.params.obj);
        delete obj[key];
        this.params.obj = obj;
      },
      submit() {
        let params = _.cloneDeep(this.params);
        this.$store.dispatch("updateSchema", params).then(() => {
          this.dialogVisible = false;
        });
      }
    }
  };
</script>

<style lang="less" scoped>
.edit-schema {
  text-align: left;
}
.field-row {
  padding-bottom: 15px;
}
</style>

