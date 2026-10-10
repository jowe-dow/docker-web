import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login, meta: { guestOnly: true } },
    { path: '/home', component: Home, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to) => {
  const authenticated = Boolean(localStorage.getItem('nebula-token') || sessionStorage.getItem('nebula-token'))
  if (to.meta.requiresAuth && !authenticated) return '/login'
  if (to.meta.guestOnly && authenticated) return '/home'
})

export default router
