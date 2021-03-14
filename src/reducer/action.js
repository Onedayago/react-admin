import * as Type from './actionType'




export function addMenu(menu) {

  return{
    type: Type.ADD_MENU,
    data: menu
  }

}

export function deleteMenu(menu) {

  return{
    type: Type.DELETE_MENU,
    data: menu
  }

}

export function editMenu(menu) {

  return{
    type: Type.EDIT_MENU,
    data: menu
  }

}


export function addRole(role) {
  return{
    type: Type.ADD_ROLE,
    data: role
  }
}

export function editRole(role) {
  return{
    type: Type.EDIT_ROLE,
    data: role
  }
}


export function deleteRole(role) {
  return{
    type: Type.DELETE_ROLE,
    data: role
  }
}




