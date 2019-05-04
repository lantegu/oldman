import Vue from 'vue'
import Router from 'vue-router'
import Usermessage from '@/components/Usermessage'
import Eldermessage from '@/components/Eldermessage'
import Addelder from '@/components/Addelder'
import Eldevents from '@/components/Eldevents'
import Home from '@/components/Home'
import Measurement from '@/components/Measurement'
import Precords from '@/components/Precords'
import Updateevent from '@/components/Updateevent'
import Addprecord from '@/components/Addprecord'
import Addelderevent from '@/components/Addelderevent'
import Storydetails from '@/components/Storydetails'
import UpdatePrecord from '@/components/UpdatePrecord'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/usermessage',
          name: 'Usermessage',
          component: Usermessage
        },
        {
          path: '/eldermessage/:idCard',
          name: 'Eldermessage',
          component: Eldermessage
        },
        {
          path: '/eldevents/:idCard',
          name: 'Eldevents',
          component: Eldevents
        },
        {
          path: '/measurement',
          name: 'Measurement',
          component: Measurement
        },
        {
          path: '/precords/:idCard',
          name: 'Precords',
          component: Precords
        },
        {
          path: '/addelder',
          name: 'Addelder',
          component: Addelder
        },
        {
          path: '/addelderevent/:idCard',
          name: 'Addelderevent',
          component: Addelderevent
        },
        {
          path: '/updateevent/:id',
          name: 'Updateevent',
          component: Updateevent
        },
        {
          path: '/storydetails/:id',
          name: 'Storydetails',
          component: Storydetails
          // props: true
        },
        {
          path: '/addprecord/:idCard',
          name: 'Addprecord',
          component: Addprecord
        },
        {
          path: '/updateprecord/:id',
          name: 'UpdatePrecord',
          component: UpdatePrecord
        }
      ]
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})
