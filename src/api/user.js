
import axios from 'axios'
import qs from 'qs'



function request(url='', data={}, method = '') {

  let config = {}

  config.method = method
  config.url=url
  config.headers={
    'Content-Type': 'application/x-www-form-urlencoded',
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
