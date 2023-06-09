import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { routerUpdateTitle } from './middleware'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

routerUpdateTitle(router, import.meta.env.VITE_APP_TITLE)

export default router
