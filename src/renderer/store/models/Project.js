export default class Project {
    // id = Math.random().toString(36).substring(2, 12)
    id = Date.now()
    updateTime = Date.now()
    createTime = Date.now()

    apis = {}

    constructor(title) {
        this.title = title
    }
    /**
     * 
     * @param {string} tag 接口分类标签
     * @param {url: string,method:string,schema:object} api 
     */
    addApi(tag, api) {
        this.apis[tag] = this.apis[tag] || []

        this.apis[tag].push(api)
    }

    removeApi(tag, index) {
        if (!this.apis[tag] || this.apis[tag].length === 1) {
            delete this.apis[tag]
        } else {
            this.apis[tag].splice(index, 1)
        }
    }
}