# mock-server
利用electron构建的桌面程序,根据自定义api信息及响应数据格式,启动服务器,响应数据

### 描述
mock-server是利用electron-vue搭建的快速开发平台，旨在提供一个生成模拟json数据的服务器。用户可以在桌面上创建项目，每个项目内可以创建多个api接口，api接口的返回数据由用户自定义，可以定义简单的键值对，也可以是数组、对象、集合。点击启动服务器之后，程序会在本地启动一个服务器，并对设置的api提供支持，按照数据结构生成并响应数据

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[1c165f7](https://github.com/SimulatedGREG/electron-vue/tree/1c165f7c5e56edaf48be0fbb70838a1af26bb015) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
