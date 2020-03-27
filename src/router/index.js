/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Wdh from '@/components/Wdh'
import Blog from '@/components/Blog'

Vue.use(Router)

const routers = [
  {
    path: '/blog',
    name: 'blog',
    component: Blog
  },
  {
    path: '/',
    component: HelloWorld
  },
  {
    path: '/wdh',
    component: Wdh
  },
]
export default routers
