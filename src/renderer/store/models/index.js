import _ from "lodash"

export class Api {
    url = ""
    // 请求方法
    method = ""
    // 响应的数据结构
    schema = {}
    // 接口描述
    description = ""

    constructor(api) {
        Object.assign(this, _.cloneDeep(api))
    }
}

export class Project {
    id = Date.now()
    // 项目标题
    title = ""
    updateTime = Date.now()
    createTime = Date.now()
    // api结构
    apis = new Api()

    constructor(data) {
        Object.assign(this, _.cloneDeep(data))
    }
}

export class ServerInfo {
    // 对应的项目id
    id = ""
    // 对应端口
    port = 0
    // 服务器
    server = null
    // 打印的日志
    loggers = []
}