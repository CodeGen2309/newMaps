import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path: '/',
      name: 'maps',
      component: () => import('../pages/maps.vue'),
    },
  ],
})

export default router
