import * as Type from './actionType'

const initState = {
  menu: [],
}


function User(state = initState, action) {
  switch(action.type){
    case Type.ADD_MENU:

      let menu = action.data;
      return {
        ...state,
        menu,
      }
    default:
      return state
  }
}

export default User

