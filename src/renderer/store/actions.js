import fs from "fs"
import del from "del"
import { promisify } from "util"
import _ from "lodash"
import Project from "./models/Project"

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const readFileAsync = async function (path) {
    let data = await readFile(path)
    data = JSON.parse(data.toString())
    return data
}
const writeFileAsync = function (path, data) {
    data = JSON.stringify(data)
    return writeFile(path, data)
}

export default {
    // 项目初始化
    async initProjects({ commit }, projects) {
        try {
            let data = await readFileAsync(`${__static}/projects.json`)
            commit("initProjects", data)
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
                writeFileAsync(`${__static}/projects.json`, data),
                writeFileAsync(`${__static}/${id}.json`, project),
            ]);
            commit("initProjects", data)
        } catch (err) {
            // 发生错误时，数据回滚到之前
            await Promise.all([
                del([`${__static}/${id}.json`]),
                writeFileAsync(`${__static}/projects.json`, state.projects)
            ])

            throw err
        }
    },
    async deleteProject({ state, commit }, id) {
        const projects = state.projects.filter(item => item.id !== id)
        try {
            await Promise.all([
                del([`${__static}/${id}.json`]),
                writeFileAsync(`${__static}/projects.json`, projects)
            ])

            commit("initProjects", projects)
        } catch (err) {
            console.error(err)
        }
    },
    async renameProject({ state, commit }, { id, title }) {
        const projects = _.cloneDeep(state.projects)
        projects.forEach(item => {
            if (item.id === id) {
                item.title = title
            }
        })

        let project = await readFileAsync(`${__static}/${id}.json`)

        try {
            await Promise.all([
                writeFileAsync(`${__static}/projects.json`, projects),
                writeFileAsync(`${__static}/${id}.json`, Object.assign({}, project, { title })),
            ])

            commit("initProjects", projects)
        } catch (err) {
            console.error(err)
        }
    }
}