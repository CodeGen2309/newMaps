import { createRouter, createMemoryHistory } from 'vue-router'

const adminPages = [
  {
    path: '/users',
    name: 'users',
    component: () => import('@/pages/users.vue'),
  },
  {
    path: '/groups',
    name: 'groups',
    component: () => import('@/pages/groups.vue'),
  },
  {
    path: '/usercard/:id',
    name: 'usercard',
    component: () => import('@/pages/usercard.vue'),
  },
]


const userPages = [
  {
    path: '/maps',
    name: 'maps',
    component: () => import('@/pages/maps.vue'),
  },
]


const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('@/pages/welcome.vue'),
    },
    {
      path: '/user',
      name: 'userView',
      component: () => import('@/views/userView.vue'),
      children: userPages
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/adminView.vue'),
      children: adminPages
    },
  ],
})

export default router
