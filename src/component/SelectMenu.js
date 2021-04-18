import React, {useState, useEffect} from 'react'
import {Table} from "antd";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {useRequest} from "ahooks";
import * as Api from "../api/user";
import SUCCESS from "../api/message";
import * as Tool from "../util/tool";


const columns = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '路由',
    dataIndex: 'route',
    key: 'route',
  }
];

const SelectMenu=(props)=>{

  const [selectedRowKeys, setSelectRowKeys] = useState([])
  const [menu, setMenu] = useState([])  //菜单数据


  useEffect(()=>{
    let temp = Tool.arrayToTree("",JSON.parse(JSON.stringify(props.menu)))

    console.log(props.menu)
    setMenu(temp)
  },[])

  useEffect(async ()=>{

    postGetRolePermission({
      _id: props._id
    })

  },[props._id])


  /**
   * 获取角色权限接口
   * */
  const {run:postGetRolePermission } = useRequest(Api.getRolePermission, {
    manual: true,
    onSuccess: async (result) => {
      console.log(result)
      if(result.code === SUCCESS.GetRolePermissionSuccess.code){


        let temp = []

        result.data.forEach((item)=>{
          temp.push(item.permissionId)
        })


        setSelectRowKeys(temp)
        props.setPermissionId(temp)

      }else{

      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  const onSelectChange = (selectedRowKeys) => {

    selectedRowKeys.forEach((item)=>{

      let menu = props.menu.find((value)=>value._id === item)

      if(menu.parentId !== "" && selectedRowKeys.indexOf(menu.parentId) < 0){
        selectedRowKeys.push(menu.parentId)
      }

    })

    setSelectRowKeys(selectedRowKeys)

    props.setPermissionId(selectedRowKeys)

  };


  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    hideSelectAll: false,
    checkStrictly: true
  };

  return(
    <>
      <Table
        dataSource={menu}
        columns={columns}
        rowSelection={rowSelection}
        pagination={false}
        rowKey={'_id'}
      />
    </>
  )
}


SelectMenu.defaultProps={
  setPermissionId: ()=>{},
  _id: ''
}

SelectMenu.propTypes={
  setPermissionId: PropTypes.func,
  _id: PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  return {
    menu: state.UserReducer.menu
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectMenu);
