import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
// import Home from '../views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {layout: 'main', auth: true},
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
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/detail',
      name: 'Detail',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/history',
      name: 'History',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/History.vue')
    },
    {
      path: '/planning',
      name: 'Planning',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Planning.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/record',
      name: 'Record',
      meta: {layout: 'main', auth: true},
      component: () => import('../views/Record.vue')
    },
    {
      path: '/register',
      name: 'Register',
      meta: {layout: 'empty', auth: true},
      component: () => import('../views/Register.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  console.log('to', to)
  const requireAuth = to.matched.some(record => record.meta.auth);

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router