import React, {useState, useEffect} from 'react'
import {Button, Drawer, Form, Input, InputNumber, Select, Table, message, Modal} from "antd";
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

  const [show, setShow] = useState(false)

  const roleAction=async (type)=>{
    switch (type) {
      case ROLE_ACTION.ADD_ROLE:
        form.resetFields()
        setVisible(true)
        setEdit(false)
        break;
      case ROLE_ACTION.EDIT_ROLE:

        if(selectRow.roleName){
          setVisible(true)
          setEdit(true)
          form.resetFields()
          form.setFieldsValue({
            roleName: selectRow.roleName,
            roleDes: selectRow.roleDes,
            sort: selectRow.sort
          })
        }else{
          message.error('请先选择角色')
        }

        break;
      case ROLE_ACTION.DELETE_ROLE:
        if(selectRow.roleName){
         setShow(true)
        }else{
          message.error('请先选择角色')
        }
        break;
      default:
        break;
    }
  }

  useEffect( ()=>{
    postGetRole()
  },[])

  /**
   * 删除角色接口
   * */
  const {run:postDeleteRole } = useRequest(Api.deleteRole, {
    manual: true,
    onSuccess: async (result) => {
      if(result.code === SUCCESS.DeleteRoleSuccess.code){
        setShow(false)
        message.success('删除角色成功')
        await postGetRole()
      }else{
        message.error(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  /**
   * 编辑角色接口
   * */
  const {run:postEditRole } = useRequest(Api.editRole, {
    manual: true,
    onSuccess: async (result) => {
      if(result.code === SUCCESS.EditRoleSuccess.code){
        message.success('编辑角色成功')
        await postGetRole()
      }else{
        message.error(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  /**
   * 获取角色接口
   * */
  const {run:postGetRole } = useRequest(Api.getRole, {
    manual: true,
    onSuccess: async (result) => {
      if(result.code === SUCCESS.GetRoleSuccess.code){
        setVisible(false)
        setRole(result.data)
      }else{
        message.error(result.msg)
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
        message.success('添加角色成功')
        setVisible(false)
        await postGetRole()
      }else{
        message.error(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  const onSelectChange = (record, selected, selectedRows) => {

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

    if(edit){

      await postEditRole({
        _id: selectRow._id,
        roleName,
        roleDes,
        sort,
        permissionId
      })
    }else{
      await postAddRole({
        roleName,
        roleDes,
        sort,
        permissionId
      })
    }


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
            console.log(permissionId)

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
        destroyOnClose={true}
      >

        {
          edit?
            renderEditRole()
            :
            renderAddRole()
        }

      </Drawer>

      <Modal
        title={'删除角色'}
        visible={show}
        centered={true}
        onOk={async ()=>{
          await postDeleteRole({
            _id: selectRow._id
          })
        }}
        onCancel={()=>{
          setShow(false)
        }}
      >
        {`是否要删除角色${selectRow.roleName}`}
      </Modal>
    </>
  )
}


export default Role
