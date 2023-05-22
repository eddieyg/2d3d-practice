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
    ],
  },
]

export default routes
