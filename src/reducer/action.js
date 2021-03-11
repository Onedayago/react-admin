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





