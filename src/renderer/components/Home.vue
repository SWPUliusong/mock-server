<template>
  <div>
    <div class="search-input">
      <el-input prefix-icon="el-icon-search" @input="filterProjects(input)" v-model="input" placeholder="请输入项目名称,按下Enter筛选"></el-input>
    </div>
    <ul class="project-list">
      <li is="router-link" :to="`/projects/${project.id}`" v-for="project in projects" :key="project.id">
        <span class="project-icon">
          <i class="el-icon-document"></i>
        </span>
        <span class="project-title">{{project.title}}</span>
      </li>
      <li class="project-add">
        <i class="el-icon-plus"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  export default {
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
  cursor: pointer;
}
li.project-add {
  line-height: 120px;
  font-size: 84px;
  color: #dfdfdf;
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
  display: inline-block;
  font-size: 72px;
  color: #d1ba74;
  height: 96px;
  line-height: 96px;
}
</style>
