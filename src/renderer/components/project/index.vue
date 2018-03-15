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
    }
  };
</script>

<style>

</style>
