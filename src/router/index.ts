import { createRouter, createWebHistory } from 'vue-router'
import SigninView from '../modules/Auth/views/SigninView.vue'
import Recent from '../modules/Dashboard/components/Recent/Recent.vue'
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
      path: '/google-callback',
      name: 'google-callback',
      component: () => import('../modules/Auth/views/GoogleCallback.vue'),
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
