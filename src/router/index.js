import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Me from '../views/Me.vue'
import Task from '../views/Task.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register

  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  ,
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/tasks',
    name: 'Task',
    component: Task
  }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
