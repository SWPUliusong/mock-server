import fs from "fs"

export default {
    initProjects({ commit }, projects) {
        fs.readFile(__static + "/projects.json", (err, data) => {
            if (err) {
                return commit("initProjects", [])
            }

            commit("initProjects", JSON.parse(data.toString()))
        })
    },
    filterProjects({ commit }, filterStr) {
        commit("filterProjects", filterStr)
    }
}