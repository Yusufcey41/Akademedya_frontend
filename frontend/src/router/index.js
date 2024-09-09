import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../Pages/LoginPage.vue'
import SignupPage from '../Pages/SignupPage.vue'
import CreateTable from '../components/CreateTable.vue'
import ListTable from '../components/ListTable.vue'



const routes=  [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/signup',
    component: SignupPage
  },
  {
    path: '/',
    component: LoginPage
  },
 
  {
    path: '/createtable',
    component: CreateTable
  },
  {
    path:'/listtable',
    component: ListTable
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
