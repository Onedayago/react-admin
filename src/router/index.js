import React from 'react'
import Root from '../View/Root'
import Login from '../View/Login'
import HomeLayout from '../View/HomeLayout'
import Manage from '../View/ManageV2'
import Home from '../View/Home'
import Role from '../View/Role'
import User from '../View/User'
import NotFound from '../View/NotFound'
import {Redirect} from 'react-router-dom'
import * as Storage from '../util/Storage'

const Private = (component, props) =>{

  if(Storage.GetToken() && Storage.GetToken()!==''){
    return component
  }else{
    return <Redirect
      to={{
        pathname: "/login",
        state: { from: props.location }
      }}
    />
  }

}

const HasLogin=(component, props)=>{

  if(Storage.GetToken() && Storage.GetToken()!==''){
    return <Redirect
      to={{
        pathname: "/",
        state: { from: props.location }
      }}
    />
  }else{
    return component
  }
}

const HasRoute=(component, props, path)=>{
  console.log(props)

  let item = props.menu.find((item)=>item.route === path)

  if(item){
    return component
  }else{
    return <Redirect
      to={{
        pathname: "/404",
        state: { from: props.location }
      }}
    />
  }

}


const routes = [
  {
    component: Root,
    routes: [
      {
        path: "/login",
        key: 'login',
        name: '登录',
        render: (props => {
          return HasLogin(<Login {...props}/>, props)
        })
      },
      {
        path: "/",
        render: (props)=>{
          return Private(<HomeLayout {...props}/>, props)
        },
        key: '/',
        routes: [
          {
            path: "/",
            component: Home,
            key: '/',
            name: '首页',
            exact: true
          },

          {
            path: "/manageMenu",
            component: Manage,
            key: 'manageMenu',
            name: '菜单管理',
            render: (props)=>{
              return HasRoute(<Manage {...props}/>, props, "manageMenu")
            }
          },

          {
            path: "/manageRole",
            component: Role,
            key: 'manageRole',
            name: '角色管理',
            render: (props)=>{
              return HasRoute(<Role {...props}/>, props, "manageRole")
            }
          },

          {
            path: "/manageUser",
            component: User,
            key: 'manageUser',
            name: '用户管理',
            render: (props)=>{
              return HasRoute(<User {...props}/>, props, "manageUser")
            }
          },

          {
            path: "*",
            key: 'notfound',
            component: NotFound
          }
        ]
      },

    ]
  }
];


export default routes
