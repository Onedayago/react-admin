import React, {useState, useEffect} from 'react'
import {Table} from "antd";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {useRequest} from "ahooks";
import * as Api from "../api/user";
import SUCCESS from "../api/message";


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

  useEffect(async ()=>{

    await postGetRolePermission({
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

      }else{
        alert(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  const onSelectChange = (selectedRowKeys) => {

    console.log(selectedRowKeys)
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
        dataSource={props.menu}
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
