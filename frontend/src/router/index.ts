import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'

import EventListComponentVue from '@/modules/events-list/component/EventListComponent.vue'
import EventCreateFormVue from '@/modules/event-create/component/EventCreateForm.vue'
import LocationListComponentVue from '@/modules/locations/component/LocationListComponent.vue'
import SignInVue from '@/modules/sign-in/component/SignIn.vue'
import SignUpVue from '@/modules/sign-up/component/SignUp.vue'

const isAuthenticated = (
  _: RouteLocationNormalized,
  _2: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return next('/auth/sign-in')
  } else {
    return next()
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'events',
      beforeEnter: isAuthenticated
    },
    {
      path: '/events',
      name: 'events',
      // component: import('@/modules/events-list/component/EventListComponent.vue'),
      component: EventListComponentVue,
      beforeEnter: isAuthenticated
    },
    {
      path: '/events/create',
      name: 'events-create-form',
      // component: import('@/modules/event-create/component/EventCreateForm.vue'),
      component: EventCreateFormVue,
      beforeEnter: isAuthenticated
    },
    {
      path: '/locations',
      name: 'locations',
      // component: import('@/modules/locations/component/LocationListComponent.vue'),
      component: LocationListComponentVue, // import('@/modules/locations/component/LocationListComponent.vue'),
      beforeEnter: isAuthenticated
    },
    {
      path: '/auth',
      name: 'auth',
      redirect: 'auth/sign-in',
      children: [
        {
          path: 'sign-in',
          name: 'auth/sign-in',
          // component: () => import('@/modules/sign-in/component/SignIn.vue')
          component: SignInVue
        },
        {
          path: 'sign-up',
          name: 'auth/sign-up',
          // component: () => import('@/modules/sign-up/component/SignUp.vue')
          component: SignUpVue
        }
      ]
    }
  ]
})

export default router
