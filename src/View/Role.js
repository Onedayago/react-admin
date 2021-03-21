import React, {useState, useEffect} from 'react'
import {Button, Drawer, Form, Input, InputNumber, Select, Table} from "antd";
import {useRequest} from "ahooks";
import * as Api from "../api/user";
import SUCCESS from "../api/message";
import SelectMenu from '../component/SelectMenu'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};


const { Option } = Select;

const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '角色描述',
    dataIndex: 'roleDes',
    key: 'roleDes',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
  }
];

const ROLE_ACTION = {
  ADD_ROLE: 'addRole',
  EDIT_ROLE: 'editRole',
  DELETE_ROLE: 'deleteRole'
}

const Role=()=>{

  const [role ,setRole] = useState([])
  const [selectedRowKeys, setSelectRowKeys] = useState([])
  const [selectRow, setSelectRow] = useState({})
  const [form] = Form.useForm();  //获取表单
  const [visible, setVisible] = useState(false)
  const [edit, setEdit] = useState(false)
  const [permissionId, setPermissionId] = useState([])

  const roleAction=(type)=>{
    switch (type) {
      case ROLE_ACTION.ADD_ROLE:
        setVisible(true)
        setEdit(false)
        break;
      case ROLE_ACTION.EDIT_ROLE:

        if(selectRow.roleName){
          setVisible(true)
          setEdit(true)
        }else{
          alert('请先选择角色')
        }


        break;
      case ROLE_ACTION.DELETE_ROLE:
        break;
      default:
        break;
    }
  }

  useEffect(async ()=>{
    await postGetRole()
  },[])

  /**
   * 获取角色接口
   * */
  const {run:postGetRole } = useRequest(Api.getRole, {
    manual: true,
    onSuccess: async (result) => {
      if(result.code === SUCCESS.GetRoleSuccess.code){

        setRole(result.data)
      }else{
        alert(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  /**
   * 添加角色接口
   * */
  const {run:postAddRole } = useRequest(Api.addRole, {
    manual: true,
    onSuccess: async (result) => {
      if(result.code === SUCCESS.AddRoleSuccess.code){
        setVisible(false)
        await postGetRole()
      }else{
        alert(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  const onSelectChange = (record, selected, selectedRows) => {

    console.log(selected)
    if(selected){
      setSelectRowKeys([record._id])
      setSelectRow(record)
    }else{
      setSelectRowKeys([])
      setSelectRow({})
    }


  };

  const rowSelection = {
    selectedRowKeys,
    onSelect: onSelectChange,
    hideSelectAll: true,
    checkStrictly: true
  };


  const onAddRole=async (values)=>{

    const {roleName, roleDes, sort} = values

    await postAddRole({
      roleName,
      roleDes,
      sort,
      permissionId
    })
  }

  /**
   * 渲染新增菜单弹窗
   * */

  const renderAddRole=()=>{
    return(
      <>
        <Form
          form={form}
          {...layout}
          initialValues={{}}
          onFinish={onAddRole}
        >
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: '' }]}
          >

            <Input
              placeholder={'角色名称'}
            />
          </Form.Item>

          <Form.Item
            label="角色描述"
            name="roleDes"
            rules={[{ required: false, message: '' }]}
          >

            <Input
              placeholder={'角色描述'}
            />
          </Form.Item>


          <Form.Item
            label="排序"
            name="sort"
            rules={[{ required: true, message: '请输入菜单排序', type: 'number' }]}
          >
            <InputNumber

            />

          </Form.Item>

          <Form.Item
            name="editBtn"
          >
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>

        <SelectMenu
          setPermissionId={(permissionId)=>{
            setPermissionId(permissionId)
          }}
        />

      </>

    )
  }

  /**
   * 渲染编辑角色弹窗
   * */

  const renderEditRole=()=>{
    return(
      <>
        <Form
          form={form}
          {...layout}
          initialValues={{}}
          onFinish={onAddRole}
        >
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: '' }]}
          >

            <Input
              placeholder={'角色名称'}
            />
          </Form.Item>

          <Form.Item
            label="角色描述"
            name="roleDes"
            rules={[{ required: false, message: '' }]}
          >

            <Input
              placeholder={'角色描述'}
            />
          </Form.Item>


          <Form.Item
            label="排序"
            name="sort"
            rules={[{ required: true, message: '请输入菜单排序', type: 'number' }]}
          >
            <InputNumber

            />

          </Form.Item>

          <Form.Item
            name="editBtn"
          >
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>

        <SelectMenu
          setPermissionId={(permissionId)=>{
            setPermissionId(permissionId)
          }}
          _id={selectRow._id}
        />

      </>

    )
  }

  const onClose = () =>{
    setVisible(false)
  }

  return(
    <>
      <Table
        dataSource={role}
        columns={columns}
        rowSelection={rowSelection}
        pagination={false}
        rowKey={'_id'}
      />

      <Button onClick={()=>roleAction(ROLE_ACTION.ADD_ROLE)}>新增</Button>
      <Button onClick={()=>roleAction(ROLE_ACTION.EDIT_ROLE)}>编辑</Button>
      <Button onClick={()=>roleAction(ROLE_ACTION.DELETE_ROLE)}>删除</Button>



      <Drawer
        title={edit?"编辑角色":"新增角色"}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={500}
      >

        {
          edit?
            renderEditRole()
            :
            renderAddRole()
        }

      </Drawer>
    </>
  )
}


export default Role
