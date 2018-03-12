<template>
  <div>
    <div class="search-input">
      <el-input prefix-icon="el-icon-search" @change="filterProjects(input)" v-model="input" placeholder="请输入项目名称,按下Enter筛选"></el-input>
    </div>
    <ul class="project-list">
      <li v-for="project in projects" :key="project.id">
        <i class="el-icon-document project-icon"></i>
        <span class="project-title">{{project.title}}</span>
      </li>
      <li>
        <i class="el-icon-plus project-icon"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    data() {
      return {
        input: ""
      };
    },
    computed: { ...mapState(["projects"]) },
    created() {
      this.$store.dispatch("initProjects");
    },
    methods: {
      ...mapActions(["filterProjects"])
    }
  };
</script>

<style>
.search-input {
  padding: 30px;
}
.project-list::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}
.project-list {
  padding: 0 30px;
}
.project-list li {
  float: left;
  text-align: center;
  width: 120px;
  height: 120px;
}
.project-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.project-icon {
  font-size: 72px;
  color: #d1ba74;
}
.project-icon.el-icon-plus {
  color: #dfdfdf;
}
</style>
