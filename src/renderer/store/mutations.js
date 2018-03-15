export default {
    initProjects(state, projects) {
        state.projects = projects
    },
    filterProjects(state, str) {
        state.filterStr = str
    }
}