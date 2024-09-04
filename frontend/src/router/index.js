import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../Pages/LoginPage.vue'
import SignupPage from '../Pages/SignupPage.vue'
import HomePage from '../Pages/HomePage.vue'
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
    path: '/home',
    component: HomePage
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
