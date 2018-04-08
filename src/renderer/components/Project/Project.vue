<template>
  <div class="project">
    <el-row class="project-header">
      <el-col :span="2">
        <span class="el-icon-arrow-left back" @click="$router.replace('/')"></span>
      </el-col>
      <el-col :span="20" class="project-title" :title="project.title">
        {{project.title}}
      </el-col>
    </el-row>
    <el-row class="project-option">
      <el-col :span="4">
        <el-switch v-model="accordion" /> {{accordion ? '只展开一个' : '可展开多个'}}
      </el-col>
      <el-col :span="4" :offset="16" class="project-btn">
        <CreateApi />
      </el-col>
    </el-row>
    <el-collapse @change="handleChange" :accordion="accordion">
      <el-collapse-item title="一致性 Consistency">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from "vuex";

  import CreateApi from "./CreateApi";
  export default {
    components: { CreateApi },
    data() {
      return {
        accordion: false
      };
    },
    created() {
      const { id } = this.$route.params;
      this.findProjectById(id);
    },
    computed: {
      ...mapState(["project"])
    },
    methods: {
      ...mapActions(["findProjectById"]),
      handleChange(val) {
        console.log(val);
      }
    }
  };
</script>

<style lang="less" scoped>
@h: 56px;
.project {
  padding: @h 30px;
}
.project-header {
  height: @h;
  background: #565656;
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
    border-right: 1px solid #999;
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
</style>
