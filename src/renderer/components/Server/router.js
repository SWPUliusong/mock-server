import Router from "koa-router"
import Mock from "mockjs"

export default function loadRouter(app, options) {
    const router = new Router()
    let apis = options.apis
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

    app.use(router.routes()).use(router.allowedMethods());
}

function shiftColor(str) {
    // 分两步替换背景和字体颜色
    return str
        .replace("@color", Mock.mock("@color"))
        .replace("@color", Mock.mock("@color"))
}

function createData(pattern) {
    let { __type__: type, ...obj } = pattern
    /**
     * result: 最后结果
     * len：当type为数组和集合时，指明生成的数据长度
     * value：当type为数组和集合时，指明数据结构
     * tpl：提供给Mock的数据生成模板
     */
    let result, len, value, tpl
    switch (type) {
        case 'array':
            ({ len, value } = obj);
            result = []
            while (len--) {
                tpl = shiftColor(value[value.length - 1])
                result.push(Mock.mock(tpl))
            }
            break
        case "object":
            result = {}
            Object.keys(obj).forEach(key => {
                let item = obj[key]
                tpl = shiftColor(item[item.length - 1])
                result[key] = Mock.mock(tpl)
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
                    tpl = shiftColor(item[item.length - 1])
                    childObj[key] = Mock.mock(tpl)
                })
                result.push(childObj)
            }
            break
        default:
            tpl = shiftColor(pattern[pattern.length - 1])
            result = Mock.mock(tpl)
    }

    return result
}