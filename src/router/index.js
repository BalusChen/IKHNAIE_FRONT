import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ApiPing from '@/components/ApiPing'
import Transaction from '@/components/ApiTransaction'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ping',
      name: 'ApiPing',
      component: ApiPing
    },
    {
      path: '/transaction/history',
      name: 'TransactionHistory',
      component: Transaction
    }
  ]
})
