export default {
    projects(state) {
        return state.projects.filter(item => {
            return item.title.indexOf(state.filterStr) > -1
        })
    }
}