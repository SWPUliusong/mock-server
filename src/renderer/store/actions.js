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
    // 创建项目
    async createProject({ state, commit }, title) {
        let project = new Project(title)
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

        try {
            await Promise.all([
                writeFileAsync(`${__static}/projects.json`, projects),
                writeFileAsync(`${__static}/${id}.json`, Object.assign({}, project, { title })),
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

    // 创建API
    async createApi({ commit, state }, data) {
        let project = state.project
        if (!project.addApi) {
            project = Project.init(state.project)
        }
        const { tag, ...api } = data
        const projectPath = `${__static}/${project.id}.json`
        try {
            project.addApi(tag, api)
            await writeFileAsync(projectPath, project)
            commit("initProject", project)
        } catch (err) {
            console.error(err)
        }
    },
}