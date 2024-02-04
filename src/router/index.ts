import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../modules/Auth/views/SigninView.vue'
import Recent from '../modules/Dashboard/components/Recent/Recent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: SigninView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../modules/Dashboard/views/DashboardView.vue'),
      children: [
        { path: '', redirect: { name: 'recent' } },
        { path: 'recent', name: 'recent', component: Recent },
      ],
    },
    {
      path: '/p/:projectName',
      name: 'project',
      component: () => import('../modules/Project/views/ProjectPage.vue')
    }
  ]
})

export default router
