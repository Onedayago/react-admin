
const TOKEN = "TOKEN"
const REMEMBER = "REMEMBER"

export function SaveToken(token, remember = false) {

  if(remember){
    localStorage.setItem(TOKEN, token)
  }else{
    sessionStorage.setItem(TOKEN, token)
  }
  localStorage.setItem(REMEMBER, remember.toString())

}

export function GetToken() {

  let remember = localStorage.getItem(REMEMBER)

  if(remember === 'true'){
    return localStorage.getItem(TOKEN)
  }else{
    return sessionStorage.getItem(TOKEN)
  }


}

export function RemoveToken() {
  localStorage.removeItem(TOKEN)
  sessionStorage.removeItem(TOKEN)
}
