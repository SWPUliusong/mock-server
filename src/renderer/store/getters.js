export default {
    projects(state) {
        if (!state.projects) return [];
        return state.projects.filter(item => {
            return item.title.indexOf(state.filterStr) > -1
        })
    }
}