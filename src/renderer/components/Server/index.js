import { fork } from "child_process"
import * as path from "path"
/**
 * 主进程以下列格式通知子进程
 * {type: string, data: any}
 * type：事件类型,提供这几种类型["START", "RESTART", "CLOSE"]
 * data：数据
 */
const EventTypes = ["START", "RESTART", "CLOSE"]

// 子进程
let child = null

export function createServer(port = 3000, options) {
    child = fork(path.resolve(__dirname, "./child_process.js"))
    child.on("message", )
}