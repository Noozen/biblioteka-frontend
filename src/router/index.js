import Vue from 'vue'
import Router from 'vue-router'
import LateFees from '@/components/LateFees'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/lateFees',
      name: 'LateFees',
      component: LateFees
    }
  ]
})
