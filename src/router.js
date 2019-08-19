import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Farmer from './views/Farmer.vue'
import Supplier from './views/Supplier.vue'
import Login from './views/User/Login.vue'
import SignUp from './views/User/SignUp.vue'
import Profile from './views/User/Profile.vue'
import singleFarmer from './views/Single/singleFarmer.vue'
import FarmersEntry from './views/FarmersEntry.vue'
import authGuard from './auth-guard'
import SearchPage from './components/SearchPage'




Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/farmer',
      name: 'farmer',
      component: Farmer

    },
    {
      path: '/farmer/:id',
      name: 'singlefarmer',
      props: true,
      component: singleFarmer

    },
    {
      path: '/supplier',
      name: 'supplier',
      component: Supplier

    },

    {
      path: '/login',
      name: 'Login',
      component: Login

    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp

    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: authGuard

    },
    {
      path: '/farmersentry',
      name: 'FarmersEntry',
      component: FarmersEntry,
      beforeEnter: authGuard

    },
    {
      path: '/searchpage',
      name: 'SearchPage',
      component: SearchPage
    }

  ]
})