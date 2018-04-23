import * as Koa from "koa"
import * as logger from "koa-logger"
import loadRouter from "./router"

// type：事件类型,提供这几种类型["START", "RESTART", "CLOSE"]
const Handles = {
    START(options) {
        const app = new Koa()
        app.use(logger())
        app.use((ctx, next) => {
            try {
                return next()
            } catch (err) {
                console.error(err)
            }
        })
        loadRouter(app, options)
        let port = options.port || 3000
        app.listen(port, () => {
            console.log(`${options.title}模拟数据服务器已启动在${port}端口了`)
        })
    },
    CLOSE() {
        process.exit(1)
    }
}

process.on("message", function ({ type, data }) {
    let handle = Handles[type]
    if (handle) {
        return handle(data)
    }

    console.log("没有对应的事件处理器！！！")
})
