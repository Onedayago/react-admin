
import React from 'react'
import {Button} from 'antd'

import PageBtn from '../constant/PageBtn'

let route = PageBtn.index.routes

const Home =()=>{
  return(
    <>
      <Button>{route.list.value}</Button>
      <Button>{route.add.value}</Button>
      <Button>{route.edit.value}</Button>
    </>
  )
}

export default Home
