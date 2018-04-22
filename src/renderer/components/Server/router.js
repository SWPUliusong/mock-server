import Router from "koa-router"
import store from "../../store"
import Mock from "mockjs"

const router = new Router()

let apis = store.project.apis
Object.keys(apis).forEach(tag => {
    apis[tag].forEach(api => {
        router[api.method.toLowerCase()](api.url, (ctx, next) => {
            let result = {}
            Object.keys(api.schema).forEach(key => {
                result[key] = createData(api.schema[key])
            })

            ctx.body = result
        })
    })
})

function createData(pattern) {
    let { __type__: type, ...obj } = pattern
    let result, len, value
    switch (type) {
        case 'array':
            ({ len, value } = obj);
            result = []
            while (len--) {
                result.push(Mock.mock(value[value.length - 1]))
            }
            break
        case "object":
            result = {}
            Object.keys(obj).forEach(key => {
                let item = obj[key]
                result[key] = Mock.mock(item[item.length - 1])
            })
            break
        case "collection":
            ({ len, value } = obj);
            result = []
            let keys = Object.keys(value)
            while (len--) {
                let childObj = {}
                keys.forEach(key => {
                    let item = value[key]
                    childObj[key] = Mock.mock(item[item.length - 1])
                })
                result.push(childObj)
            }
            break
        default:
            result = Mock.mock(pattern[pattern.length - 1])
    }

    return result
}