import _ from "lodash"

class Api {
    url = ""
    method = ""
    schema = {}

    constructor(api) {
        Object.assign(this, api)
    }
}

export default class Project {
    // id = Math.random().toString(36).substring(2, 12)
    id = Date.now()
    updateTime = Date.now()
    createTime = Date.now()

    apis = {}

    constructor(title) {
        this.title = title
    }

    // 根据现有数据初始化一个project
    static init(project) {
        project = _.cloneDeep(project)
        if (project.addApi) return project
        return Object.assign(new this(), project)
    }
    /**
     * 新增api
     * @param {string} tag 接口分类标签
     * @param {url: string,method:string,schema:object} api 
     */
    addApi(tag, api) {
        this.apis[tag] = this.apis[tag] || []
        this.apis[tag].push(new Api(api))
    }

    removeApi(tag, index) {
        if (!this.apis[tag] || this.apis[tag].length === 1) {
            delete this.apis[tag]
        } else {
            this.apis[tag].splice(index, 1)
        }
    }

    updateApi(tag, index, api) {
        this.apis[tag][index] = api
    }
}