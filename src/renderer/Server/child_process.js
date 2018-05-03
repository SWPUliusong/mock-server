const Koa = require("koa")
const logger = require("koa-logger")
const loadRouter = require("./router")

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
            process.send({ type: "listening" })
        })
    },
    CLOSE() {
        process.exit(1)
    }
}

process.on("message", function ({ type, options }) {
    let handle = Handles[type]
    if (handle) {
        return handle(options)
    }

    console.error("没有对应的事件处理器！！！")
    process.exit(1)
})
