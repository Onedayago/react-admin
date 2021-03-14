import * as Type from './actionType'

const initState = {
  menu: [
    {
      title: '首页',
      key: 'index',
      name: '首页',
      parentKey: ''
    },
    {
      title: '权限管理',
      key: 'manage',
      name: '权限管理',
      parentKey: ''
    },

    {
      title: '菜单管理',
      key: 'manageMenu',
      name: '菜单管理',
      parentKey: 'manage'
    },

    {
      title: '角色管理',
      key: 'manageRole',
      name: '角色管理',
      parentKey: 'manage'
    }
  ],

  role: [],
  users: []
}


function User(state = initState, action) {
  switch(action.type){
    case Type.ADD_MENU:

      let menu = [...state.menu, action.data];
      return {
        ...state,
        menu,
      }
    case Type.DELETE_MENU:
      return {
        ...state,
        menu: action.data
      }
    case Type.EDIT_MENU:
      return {
        ...state,
        menu: action.data
      }
    case Type.ADD_ROLE:
      return {
        ...state,
        role: [...state.role, action.data]
      }
    case Type.DELETE_ROLE:
      return {
        ...state,
        role: action.data
      }
    case Type.EDIT_ROLE:
      return {
        ...state,
        role: action.data
      }
    default:
      return state
  }
}

export default User

