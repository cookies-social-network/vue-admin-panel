import MainLayout from 'app/layouts/MainLayout.vue'
import { ROUTE_NAMES } from 'shared/constants'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: ROUTE_NAMES.uikit,
          component: () => import('pages/UIKit'),
        },
      ],
    },
  ],
})

export default router
