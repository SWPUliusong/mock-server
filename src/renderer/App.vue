<template>
  <div id="app">
    <router-view></router-view>
    <ServerInfo></ServerInfo>
  </div>
</template>

<script>
  import ServerInfo from "./components/common/ServerInfo";
  export default {
    name: "mock-server",
    components: {
      ServerInfo
    }
  };
</script>

<style lang="less">
/* CSS */

body,
ol,
ul,
h1,
h2,
h3,
h4,
h5,
h6,
p,
pre,
th,
td,
dl,
dd,
form,
fieldset,
legend,
input,
textarea,
select {
  margin: 0;
  padding: 0;
}

body {
  font: 12px"宋体", "Arial Narrow", HELVETICA;
  background: #fff;
  -webkit-text-size-adjust: 100%;
}

a {
  color: #2d374b;
  text-decoration: none;
  &:hover {
    color: #cd0200;
    text-decoration: underline;
  }
}

em {
  font-style: normal;
}

li {
  list-style: none;
}

img {
  border: 0;
  vertical-align: middle;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

p {
  word-wrap: break-word;
}

.pull-left {
  float: left;
}

.pull-right {
  float: right;
}

.scrollbar {
  overflow-y: auto;
  /* 滚动条 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  /* 滚动条的滑轨背景颜色 */
  &::-webkit-scrollbar-track {
    background-color: #707479; // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    -webkit-border-radius: 4px;
    border-radius: 4px;
  }
  /* 滑块颜色 */
  &::-webkit-scrollbar-thumb {
    -webkit-border-radius: 4px;
    border-radius: 4px; // background-color: rgba(25, 25, 25, 0.1);
    background-color: #1d1e1f;
  }
  /* 滑轨两头的监听按钮颜色 */
  &::-webkit-scrollbar-button {
    display: none;
    background-color: #7c2929;
  }
}
</style>