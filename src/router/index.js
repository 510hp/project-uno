import Vue from 'vue'
import Router from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {layout: 'main'},
      component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {layout: 'empty'},
      component: () => import('../views/Login.vue')
    },
    {
      path: '/categories',
      name: 'Categories',
      meta: {layout: 'main'},
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/detail',
      name: 'Detail',
      meta: {layout: 'main'},
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/history',
      name: 'History',
      meta: {layout: 'main'},
      component: () => import('../views/History.vue')
    },
    {
      path: '/planning',
      name: 'Planning',
      meta: {layout: 'main'},
      component: () => import('../views/Planning.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {layout: 'main'},
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/record',
      name: 'Record',
      meta: {layout: 'main'},
      component: () => import('../views/Record.vue')
    },
    {
      path: '/register',
      name: 'Register',
      meta: {layout: 'empty'},
      component: () => import('../views/Register.vue')
    }
  ]
})