import Vue from 'vue'
import Router from 'vue-router'
import GMap from './components/home/GMap'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'gmap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Check if the route we are about to go into has an auth guard i.e. If it has the metadata
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // Check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      // User signed in, proceed to route
      next()
    } else {
      // No user signed in, redirect to login
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router