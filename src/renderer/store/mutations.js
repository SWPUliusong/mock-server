import { Api, ServerInfo } from "./models"
import _ from "lodash"

export default {
    initProjects(state, projects) {
        state.projects = projects
    },
    filterProjects(state, str) {
        state.filterStr = str
    },
    initProject(state, project) {
        state.project = project
    },
    initApi(state, api) {
        state.api = api
    },
    // 添加api
    addApi(state, { tag, api }) {
        // 直接更新project的apis，vuex监听不到这个变化,必须更新整个project引用
        let project = _.clone(state.project)
        project.apis[tag] = project.apis[tag] || []
        project.apis[tag].push(new Api(api))
        state.project = project
    },
    // 删除api
    removeApi(state, { tag, index }) {
        let project = _.clone(state.project)
        if (!project.apis[tag] || project.apis[tag].length === 1) {
            delete project.apis[tag]
        } else {
            project.apis[tag].splice(index, 1)
        }
        state.project = project
    },
    // 只修改api基础结构，不修改schema
    updateApi(state, { tag, index, api }) {
        let project = _.clone(state.project)
        const { schema } = project.apis[tag][index]
        // 保留schema结构
        Object.assign(api, { schema })
        project.apis[tag][index] = new Api(api)
        state.project = project
    },
    // 修改api响应数据的schema
    updateSchema(state, { type, key, value, len, obj }) {
        let project = _.clone(state.project)
        let api = _.clone(state.api)
        let { tag, index } = api
        let result
        switch (type) {
            case "array":
                result = { __type__: type, value, len }
                api.schema[key] = result
                project.apis[tag][index].schema[key] = result
                break
            case "object":
                result = Object.assign(obj, { __type__: type })
                api.schema[key] = result
                project.apis[tag][index].schema[key] = result
                break
            case "collection":
                result = { __type__: type, value: obj, len }
                api.schema[key] = result
                project.apis[tag][index].schema[key] = result
                break
            default:
                api.schema[key] = value
                project.apis[tag][index].schema[key] = value
        }
        state.project = project
        state.api = api
    },
    // 删除schema的某个字段
    deleteField(state, { key }) {
        let project = _.clone(state.project)
        let api = _.clone(state.api)
        let { tag, index } = api

        delete api.schema[key]
        delete project.apis[tag][index].schema[key]

        state.project = project
        state.api = api
    },

    // 创建服务器
    createServer(state, { id, port, server }) {
        let serverInfo = new ServerInfo()
        Object.assign(serverInfo, { id, port, server })
        state.serverInfo = serverInfo
    },
    // 关闭服务器
    closeServer(state) {
        state.serverInfo = new ServerInfo()
    },
    // 接受服务器打印的日志
    receiveLog(state, { log, time = Date.now() }) {
        let logger = state.serverInfo.logger
        // 最多保留50条记录
        if(logger.length >= 50) {
            logger.shift()
        }
        logger.push({ time, log })
    }
}