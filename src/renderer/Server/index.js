import { fork } from "child_process"
import * as path from "path"
import { EventEmitter } from "events"
/**
 * 主进程以下列格式通知子进程
 * {type: string, data: any}
 * type：事件类型,提供这几种类型["START", "RESTART", "CLOSE"]
 * data：数据
 */
const EventTypes = ["START", "RESTART", "CLOSE"]

// 子进程
let child = null

export class Server extends EventEmitter {
    options = {}

    constructor(port, options) {
        super()
        // 合并保存参数
        Object.assign(this.options, options, { port })
        this._fork(this.options)
    }
    // 创建子进程开启服务器
    _fork(options) {
        // 限定只能开启一个服务器
        try {
            if (child) {
                throw new Error("存在已开启的服务器！！！")
            }
            child = fork(path.resolve(__dirname, "./child_process.js"), {
                stdio: "pipe",
            })
            child.send({ type: "START", options })
            child.on("exit", () => {
                console.log("子进程已退出")
                child = null
            })
            child.stdout.on("data", data => {
                console.log(`子进程消息:  ${data.toString()}`)
                this.emit("data", data.toString())
            })
            child.stderr.on("data", data => {
                console.log(`子进程错误消息:  ${data.toString()}`)
                this.emit("error", data.toString())
            })
        } catch(err) {
            console.error(err)
        }
    }
    
    close() {
        if (!child) return
        // 移除实例上的监听器
        this.removeAllListeners("data")
        this.removeAllListeners("error")
        // 关闭子进程并释放child
        child.send({ type: "CLOSE" })
    }

    restart() {
        this.close()
        child.once("exit", () => {
            this._fork(this.options)
        })
    }
}