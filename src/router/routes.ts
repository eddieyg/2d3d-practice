import type { RouteRecordRaw } from 'vue-router'
import RootLayout from '@/components/layout/RootLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'RootLayout',
    component: RootLayout,
    children: [
      {
        path: '/',
        component: () => import('@/pages/main/Index.vue'),
        name: 'main',
        meta: {
          title: '2D3D Practice Case',
        },
      },
      {
        path: '/scroll-highlight',
        name: 'scroll-highlight',
        component: () => import('@/pages/scroll-highlight/Index.vue'),
        meta: {
          title: 'scroll text highlight',
          showCase: true,
        },
      },
      {
        path: '/superlist-3d',
        name: 'superlist-3d',
        component: () => import('@/pages/superlist-3d/Index.vue'),
        meta: {
          title: 'superlist 3d',
          showCase: true,
        },
      },
      {
        path: '/lottie-animation',
        name: 'lottie-animation',
        component: () => import('@/pages/lottie-animation/Index.vue'),
        meta: {
          title: 'lottie animation',
          showCase: true,
        },
      },
    ],
  },
]

export default routes
