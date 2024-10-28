  /*
  * @Author: hiddenSharp429 z404878860@163.com
  * @Date: 2024-10-28 19:51:51
  * @LastEditors: hiddenSharp429 z404878860@163.com
  * @LastEditTime: 2024-10-28 20:38:09
  */
  import { createRouter, createWebHistory } from 'vue-router'
  import Home from '@/components/Home.vue'
  import Layout from '@/layouts/Layout.vue'

  const routes = [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'auth',
          name: 'auth',
          component: () => import('@/components/Auth.vue')
        },
        // {
        //   path: 'game-lobby',
        //   name: 'gameLobby',
        //   component: () => import('@/components/GameLobby.vue'),
        //   meta: { requiresAuth: true }
        // },
        // {
        //   path: 'game-room/:id',
        //   name: 'gameRoom',
        //   component: () => import('@/components/GameRoom.vue'),
        //   meta: { requiresAuth: true }
        // }
      ]
    }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  // 路由守卫
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!localStorage.getItem('token')) {
        next('/auth')
      } else {
        next()
      }
    } else {
      next()
    }
  })

  export default router