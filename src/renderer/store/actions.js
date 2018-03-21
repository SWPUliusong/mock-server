import fs from "fs"
import del from "del"
import { promisify } from "util"
import Project from "./models/Project"

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

export default {
    // 项目初始化
    async initProjects({ commit }, projects) {
        try {
            let data = await readFileAsync(__static + "/projects.json")
            commit("initProjects", JSON.parse(data.toString()))
        } catch (err) {
            commit("initProjects", [])
        }
    },
    // 筛选需要项目
    filterProjects({ commit }, filterStr) {
        commit("filterProjects", filterStr)
    },
    // 创建项目
    async createProject({ state, commit }, title) {
        let project = new Project(title)
        let id = project.id
        let data = state.projects.concat([{ id, title }])

        try {
            await Promise.all([
                writeFileAsync(__static + "/projects.json", JSON.stringify(data)),
                writeFileAsync(`${__static}/${id}.json`, JSON.stringify(project)),
            ]);
            commit("initProjects", data)
        } catch (err) {
            // 发生错误时，数据回滚到之前
            await Promise.all([
                del([`${__static}/${id}.json`]),
                writeFileAsync(__static + "/projects.json", JSON.stringify(state.projects))
            ])

            throw err
        }
    }
}