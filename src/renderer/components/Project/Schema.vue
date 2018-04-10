<template>
  <div class="api-schema">
    <strong>API将按以下格式生成数据: </strong>
    <p class="show-schema">
      {{schema}}
      <el-button class="schema-edit" icon="el-icon-edit">修改</el-button>
    </p>
  </div>
</template>

<script>
  export default {
    props: ["value"],
    computed: {
      schema() {
        let val = this.value
        if (Object.keys(val).length === 0) return "{ }";
        return JSON.parse(val);
      }
    }
  };
</script>

<style lang="less" scoped>
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
  top: -1px;
  right: -1px;
}
</style>
