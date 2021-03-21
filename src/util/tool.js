

/**
 * 将菜单数组转成树状，用来前端显示
 * 关联字段 parentKey key
 * @return
 * */
export const arrayToTree=(parentId, data)=> {

  let temp = []


  for(let index in data){


    if(data[index].parentId === parentId){

      data[index].children = arrayToTree(data[index]['_id'], data)

      temp.push(data[index])
    }
  }


  return temp

}


/**
 * 将树状转一维数组
 * 关联字段 parentKey key
 * @return
 * */

export const treeToArrayFun = (arr, parentKey) =>{
  let temp = []



  const treeToArray=(arr, parentKey) =>{

    let i = 0;

    arr.forEach((item)=>{

      if(item.children.length === 0){
        item.parentKey = parentKey
        item.index = i;
        i++;
        temp.push(item)
      }else{
        treeToArray(item.children, item.key)
        item.parentKey = parentKey
        item.index = i;
        i++;
        item.children = []
        temp.push(item)
      }

    })

  }
  treeToArray(arr, parentKey)

  return temp

}

/**
 * 获取 routes 配置文件流的 key value
 * */

export const routesToAarrayFun = (routes) =>{

  let routesArr = []


  const routesToAarray = (routes)=>{

    routes.forEach((item)=>{

      if(item.hasOwnProperty('key')&& item.hasOwnProperty('name') && !item.hasOwnProperty('routes')){
        let obj ={
          key: item.key,
          name: item.name
        }

        routesArr.push(obj)
      }else if(item.hasOwnProperty('routes') && item.routes.length >0){

        if(item.hasOwnProperty('key') && item.hasOwnProperty('name')){
          let obj ={
            key: item.key,
            name: item.name
          }

          routesArr.push(obj)
        }
        routesToAarray(item.routes)
      }

    })

  }

  routesToAarray(routes)

  return routesArr
}



