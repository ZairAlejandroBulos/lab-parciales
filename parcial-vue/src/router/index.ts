import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ArticulosView from '../views/ArticulosView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: ArticulosView
  },
  {
    path: '/form/:id',
    name: 'form',
    component: () => import(/* webpackChunkName: "form" */ '../views/FormularioView.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router