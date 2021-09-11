import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blocks',
    name: 'Blocks',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Blocks.vue')
  },
  {
    path: '/blocks/:num',
    name: 'Block',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Block.vue')
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: () => import(/* webpackChunkName: "about" */ '../views/Accounts.vue')
  },
  {
    path: '/accounts/:id',
    name: 'Account',
    component: () => import(/* webpackChunkName: "about" */ '../views/Account.vue')
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import(/* webpackChunkName: "about" */ '../views/Transactions.vue')
  },
  {
    path: '/transactions/:txhash',
    name: 'Transaction',
    component: () => import(/* webpackChunkName: "about" */ '../views/Transaction.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router