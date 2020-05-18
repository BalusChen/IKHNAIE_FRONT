import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/components/Index'
import ApiPing from '@/components/ApiPing'
import TransactionHistorry from '@/components/transaction/History'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/ping',
    name: 'ApiPing',
    component: ApiPing
  },
  {
    path: '/transaction/history/:food_id',
    name: 'TransactionHistory',
    component: TransactionHistorry
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
  },

  // 后台管理页面
  {
    path: '/admin',
    name: 'AdminIndex',
    component: () => import('../components/admin/AdminIndex.vue'),
    children: [
      {
        path: '/userlist',
        name: 'UserList',
        component: () => import('../components/admin/AdminUserList.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
