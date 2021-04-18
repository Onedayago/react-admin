
import axios from 'axios'
import qs from 'qs'
import * as Storage from '../util/Storage'


function request(url='', data={}, method = '') {

  let config = {}

  config.method = method
  config.url=url
  config.headers={
    'Content-Type': 'application/x-www-form-urlencoded',
    'token': Storage.GetToken()
  }


  if(method === 'get'){
    config.params = data
  }else{
    config.data = qs.stringify(data)
  }



  return new Promise((resole, reject)=>{
    axios(config)
      .then(function (response) {
        resole(response.data);
      })
      .catch(function (error) {
        reject(error)
      });
  })
}


export function login(data) {

  return request('api/user/login', data, 'post')

}

export function addMenu(data) {

  return request('api/permission/addMenu', data, 'post')
}

export function getMenu(data={}) {

  return request('api/permission/getMenu', data, 'post')
}

export function deleteMenu(data={}) {

  return request('api/permission/deleteMenu', data, 'delete')
}

export function updateMenu(data={}) {

  return request('api/permission/updateMenu', data, 'patch')
}

export function addRole(data={}) {

  return request('api/role/addRole', data, 'post')
}


export function getRole(data={}) {

  return request('api/role/getRole', data, 'post')
}

export function getRolePermission(data={}) {

  return request('api/role/getRolePermission', data, 'post')
}

export function deleteRole(data={}) {

  return request('api/role/deleteRole', data, 'delete')
}

export function editRole(data={}) {

  return request('api/role/editRole', data, 'patch')
}

export function addUser(data={}) {

  return request('api/user/addUser', data, 'post')
}

export function editUser(data={}) {

  return request('api/user/editUser', data, 'patch')
}

export function getUser(data={}) {

  return request('api/user/getUser', data, 'post')
}


export function deleteUser(data={}) {

  return request('api/user/deleteUser', data, 'delete')
}
