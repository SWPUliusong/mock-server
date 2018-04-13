export default {
    initProjects(state, projects) {
        state.projects = projects
    },
    filterProjects(state, str) {
        state.filterStr = str
    },
    initProject(state, project) {
        state.project = project
    },
    initApi(state, api) {
        state.api = api
    }
}