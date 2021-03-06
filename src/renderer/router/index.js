import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home/Home').default
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: require('@/components/Project/Project').default
    },
    {
      path: '/tags/:tag/schema/:index',
      name: 'schema',
      component: require('@/components/Schema/Schema').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
