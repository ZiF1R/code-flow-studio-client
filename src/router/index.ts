import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../modules/Auth/views/SigninView.vue'
import Recent from '../modules/Dashboard/views/Recent.vue'
import Dashboard from '../modules/Dashboard/views/DashboardView.vue'
import Cookies from 'js-cookie';

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
      component: Dashboard,
      children: [
        { path: '', redirect: { name: 'recent' } },
        { path: 'recent', name: 'recent', component: Recent },
        { path: 'projects', name: 'projects', component: () => import('../modules/Dashboard/views/AllProjects.vue') },
        { path: 'templates', name: 'templates', component: () => import('../modules/Dashboard/views/Templates.vue') },
      ],
    },
    {
      path: '/p/:projectName',
      name: 'project',
      component: () => import('../modules/Project/views/ProjectPage.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get('accessToken');
  const authAccess = token !== undefined && token !== 'undefined';
  if (to.name !== 'signin') {
    if (!authAccess) {
      next({ name: 'signin' });
    } else {
      next();
    }
  } else {
    if (authAccess) {
      next({ name: 'recent' });
    } else {
      next();
    }
  }
})

export default router
