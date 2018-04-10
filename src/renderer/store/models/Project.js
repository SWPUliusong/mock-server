import _ from "lodash"

class Api {
    url = ""
    method = ""
    schema = {}
    description = ""

    constructor(api) {
        Object.assign(this, api)
    }
}

export default class Project {
    title = ""
    id = Date.now()
    updateTime = Date.now()
    createTime = Date.now()

    apis = {}

    constructor(data) {
        Object.assign(this, _.cloneDeep(data))
    }

    // 返回一个plain object
    plain() {
        return JSON.parse(JSON.stringify(this))
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
        this.apis[tag][index] = new Api(api)
    }

}