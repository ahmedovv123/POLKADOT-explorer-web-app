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
    
    props: route => ({page: route.query.page}),
    component: () => import('../views/Blocks.vue')
  },
  {
    path: '/blocks/:num',
    name: 'Block',
    props: true,
    component: () => import( '../views/Block.vue')
  },
  {
    path: '/accounts',
    name: 'Accounts',
    props: route => ({page: route.query.page}),
    component: () => import( '../views/Accounts.vue')
  },
  {
    path: '/accounts/:id',
    name: 'Account',
    props: route => ({txPage: route.query.txPage}),
    component: () => import( '../views/Account.vue')
  },
  {
    path: '/transactions',
    name: 'Transactions',
    props: route => ({txPage: route.query.txPage}),
    component: () => import( '../views/Transactions.vue')
  },
  {
    path: '/transactions/:txhash',
    name: 'Transaction',
    component: () => import('../views/Transaction.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router