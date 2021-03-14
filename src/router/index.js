import React from 'react'
import Root from '../View/Root'
import Login from '../View/Login'
import HomeLayout from '../View/HomeLayout'
import Manage from '../View/Manage'
import Home from '../View/Home'
import Role from '../View/Role'
import User from '../View/User'

const routes = [
  {
    component: Root,
    routes: [
      {
        path: "/login",
        key: 'login',
        name: '登录',
        component: Login
      },
      {
        path: "/",
        component: HomeLayout,
        key: '/',
        routes: [
          {
            path: "/index",
            component: Home,
            key: 'index',
            name: '首页'
          },

          {
            path: "/manageMenu",
            component: Manage,
            key: 'manageMenu',
            name: '菜单管理'
          },

          {
            path: "/manageRole",
            component: Role,
            key: 'manageRole',
            name: '角色管理'
          },

          {
            path: "/manageUser",
            component: User,
            key: 'manageUser',
            name: '用户管理'
          }
        ]
      },
    ]
  }
];


export default routes
