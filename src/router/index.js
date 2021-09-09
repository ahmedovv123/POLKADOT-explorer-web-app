import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/blocks/number',
    name: 'BlockByNumber',
    
    component: () => import( '../components/BlockByNumber.vue')
  },
  {
    path: '/blocks/number/x',
    name: 'GetXBlocks',
    
    component: () => import('../components/GetXBlocks.vue')
  },
  {
    path: '/blocks',
    name: 'BlocksCount',
    
    component: () => import('../components/BlocksCount.vue')
  },
  {
    path: '/blocks/hash',
    name: 'BlockByHash',
    
    component: () => import('../components/BlockByHash.vue')
  },
  {
    path: '/block/:hash',
    name: 'BlockDetails',
    
    
    component: () => import('../components/BlockDetails.vue')
  },
  {
    path: '/address',
    name: 'AddressInfo',
    
    component: () => import('../components/GetAddressInfo.vue')
  },
  {
    path: '/transactions/hash',
    name: 'TransactionByHash',
    
    component: () => import('../components/GetTransactionByHash.vue')
  },
  {
    path: '/address/transactions',
    name: 'AddressTransactions',
    
    component: () => import('../components/GetAddressTransactions.vue')
  },
  {
    path: '/transaction/:hash',
    name: 'TransactionDetails',
    
    
    component: () => import('../components/TransactionDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
