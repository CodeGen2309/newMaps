import { createRouter, createMemoryHistory, createWebHashHistory } from 'vue-router'

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
  {
    path: '/maplist',
    name: 'maplist',
    component: () => import('@/pages/maplist.vue'),
  },
  {
    path: '/mapcard/:id',
    name: 'mapcard',
    component: () => import('@/pages/mapcard.vue'),
  },
]


const userPages = [
  {
    path: '/maps/:id',
    name: 'maps',
    component: () => import('@/components/map.vue'),
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
