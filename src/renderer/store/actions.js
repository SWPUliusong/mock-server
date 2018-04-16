import fs from "fs"
import del from "del"
import { promisify } from "util"
import _ from "lodash"
import { Project, Api } from "./models"

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
    // 读取所有项目简略信息
    async findProjects({ state, commit }) {
        // 若已经获取过，则不再读取文件
        if (state.projects) return;
        try {
            let projects = await readFileAsync(`${__static}/projects.json`)
            commit("initProjects", projects)
        } catch (err) {
            commit("initProjects", [])
        }
    },
    // 筛选需要项目
    filterProjects({ commit }, filterStr) {
        commit("filterProjects", filterStr)
    },

    // 操作Project
    // 创建项目
    async createProject({ state, commit }, title) {
        let project = new Project({ title })
        let id = project.id
        let data = state.projects.concat([{ id, title }])

        let projectsPath = `${__static}/projects.json`
        let projectPath = `${__static}/${id}.json`

        try {
            await Promise.all([
                writeFileAsync(projectsPath, data),
                writeFileAsync(projectPath, project),
            ]);
            commit("initProjects", data)
        } catch (err) {
            // 发生错误时，数据回滚到之前
            await Promise.all([
                del([projectPath]),
                writeFileAsync(projectsPath, state.projects)
            ])

            throw err
        }
    },
    // 删除项目
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
    // 项目重命名
    async renameProject({ state, commit }, { id, title }) {
        const projects = _.cloneDeep(state.projects)
        projects.forEach(item => {
            if (item.id === id) {
                item.title = title
            }
        })

        let project = await readFileAsync(`${__static}/${id}.json`)
        project.title = title
        project.updateTime = Date.now()

        try {
            await Promise.all([
                writeFileAsync(`${__static}/projects.json`, projects),
                writeFileAsync(`${__static}/${id}.json`, project),
            ])

            commit("initProjects", projects)
        } catch (err) {
            console.error(err)
        }
    },
    // 获取项目
    async findProjectById({ state, commit }, id) {
        // 如果就是当前project，则不再读取文件
        let project = state.project
        if (project && project.id === id) {
            return
        }

        let projectPath = `${__static}/${id}.json`
        try {
            project = await readFileAsync(projectPath)
            commit("initProject", project)
        } catch (err) {
            console.error(err)
        }
    },

    // 操作Api
    // 创建API
    async createApi({ commit, state }, data) {
        let project = state.project

        const { tag, ...api } = data
        const projectPath = `${__static}/${project.id}.json`
        try {
            commit("addApi", { tag, api })
            await writeFileAsync(projectPath, state.project)
        } catch (err) {
            console.error(err)
        }
    },
    // 删除API
    async deleteApi({ commit, state }, { tag, index }) {
        let project = state.project

        const projectPath = `${__static}/${project.id}.json`
        try {
            commit("removeApi", { tag, index })
            await writeFileAsync(projectPath, state.project)
        } catch (err) {
            console.error(err)
        }
    },
    // 修改API
    async updateApi({ commit, state }, data) {
        let project = state.project

        const { tag, index, ...api } = data
        const projectPath = `${__static}/${project.id}.json`
        try {
            commit("updateApi", { tag, index, api })
            await writeFileAsync(projectPath, state.project)
        } catch (err) {
            console.error(err)
        }
    },
    // 获取api
    findApi({ commit, state }, { tag, index }) {
        let project = state.project

        if (project) {
            let api = _.cloneDeep(project.apis[tag][index])
            return commit("initApi", Object.assign(api, { tag, index }))
        }
        return commit("initApi", null)
    },

    // 操作Schema
    // 修改
    async updateSchema({ commit, state }, payload) {
        let { id } = state.project
        const projectPath = `${__static}/${id}.json`
        try {
            commit("updateSchema", payload)
            await writeFileAsync(projectPath, state.project)
        } catch (err) {
            console.error(err)
        }
    },
    // 删除字段
    async deleteField({ commit, state, dispatch }, { key }) {
        let { id } = state.project
        const projectPath = `${__static}/${id}.json`
        try {
            commit("deleteField", { key })
            await writeFileAsync(projectPath, state.project)
        } catch (err) {
            console.error(err)
        }
    },
}