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
    },
    // 用户界面
    {
      path: '/user',
      name: 'UserIndex',
      component: () => import('../components/user/UserIndex.vue'),
      children: [
        {
          path: '/productlist',
          name: 'ProductList',
          component: () => import('../components/user/UserProductList.vue')
        },
        {
          path: '/productadd',
          name: 'ProductAdd',
          component: () => import('../components/product/AddProduct.vue')
        }
      ]
    }
  ]
})
