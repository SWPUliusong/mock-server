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
    filterProjects({ state, commit }, filterStr) {
        if (!filterStr) return 

        let res = state.projects.filter(item => {
            return item.title.indexOf(filterStr) > -1
        })

        commit("initProjects", res)
    }
}