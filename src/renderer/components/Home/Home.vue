<template>
  <div>
    <div class="search-input">
      <el-input prefix-icon="el-icon-search" @input="filterProjects(input)" v-model="input" placeholder="请输入项目名称,按下Enter筛选"></el-input>
    </div>
    <ul class="project-list">
      <li :to="`/projects/${project.id}`" v-for="project in projects" :key="project.id">
        <span class="project-icon">
          <i class="iconfont icon-xiangmu"></i>
        </span>
        <span class="project-title">{{project.title}}</span>
      </li>
      <li class="project-add">
        <CreateProject />
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import CreateProject from "./CreateProject";

  export default {
    components: { CreateProject },
    data() {
      return {
        input: ""
      };
    },
    computed: { ...mapGetters(["projects"]) },
    created() {
      this.$store.dispatch("initProjects");
    },
    methods: {
      ...mapActions(["filterProjects"])
    }
  };
</script>

<style lang="less">
.search-input {
  padding: 30px;
}
.project-list {
  padding: 0 30px;
  li {
    float: left;
    text-align: center;
    width: 120px;
    height: 120px;
    cursor: pointer;
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
  height: 24px;
  line-height: 24px;
}
.project-icon {
  display: block;
  color: #d1ba74;
  height: 96px;
  line-height: 96px;
  .iconfont {
    font-size: 72px;
  }
}
</style>
