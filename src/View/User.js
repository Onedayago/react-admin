
import React, {useState, useEffect, useRef} from 'react'
import {Table, Button, Form, Input, Select, Drawer, Checkbox, InputNumber, message, Modal} from 'antd';
import {useRequest} from "ahooks";
import * as Api from "../api/user";
import SUCCESS from "../api/message";

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password'
  },
  {
    title: '是否是管理员',
    dataIndex: 'isAdmin',
    key: 'isAdmin'
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort'
  }
];

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};


const { Option } = Select;

const USER_ACTION = {
  ADD_USER: 'addUser',
  EDIT_USER: 'editUser',
  DELETE_USER: 'deleteUser'
}


const User=()=>{

  const [visible, setVisible] = useState(false)
  const [edit, setEdit] = useState(false)
  const [role ,setRole] = useState([])
  const [user, setUser] = useState([])
  const [selectedRowKeys, setSelectRowKeys] = useState([])
  const [selectRow, setSelectRow] = useState({})

  const [show, setShow] = useState(false)

  const [form] = Form.useForm();


  useEffect(()=>{
    postGetUser()
    postGetRole()
  },[])

  /**
   * 获取用户接口
   * */
  const {run:postGetUser } = useRequest(Api.getUser, {
    manual: true,
    onSuccess: async (result) => {
      if(result.code === SUCCESS.GetUserSuccess.code){
        setUser(result.data)
      }else{
        message.error(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });


  /**
   * 添加用户接口
   * */
  const {run:postAddUser } = useRequest(Api.addUser, {
    manual: true,
    onSuccess: async (result) => {
      if(result.code === SUCCESS.AddUserSuccess.code){
        message.success('添加用户成功')
        await postGetUser()
        setVisible(false)
      }else{
        message.error(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  /**
   * 编辑用户接口
   * */
  const {run:postEditUser } = useRequest(Api.editUser, {
    manual: true,
    onSuccess: async (result) => {
      if(result.code === SUCCESS.EditUserSuccess.code){
        message.success('编辑用户成功')
        await postGetUser()
        setVisible(false)
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
   * 删除用户
   * */
  const {run:postDeleteUser } = useRequest(Api.deleteUser, {
    manual: true,
    onSuccess: async (result) => {

      if(result.code === SUCCESS.DeleteUserSuccess.code){
        setShow(false)
        message.success('删除用户成功')
        await postGetUser()
      }else{
        message.error(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });


  const userAction=async (type)=>{
    switch (type) {
      case USER_ACTION.ADD_USER:
        form.resetFields()
        form.setFieldsValue()
        setEdit(false)
        setVisible(true)
        break;
      case USER_ACTION.DELETE_USER:

        if(selectRow.username){
          setShow(true)
        }else{
          message.error('请先选择要删除的用户')
        }
        break;
      case USER_ACTION.EDIT_USER:

        if(selectRow.username){
          setVisible(true)
          setEdit(true)
          form.resetFields()
          form.setFieldsValue({
            username: selectRow.username,
            password: selectRow.password,
            sort: selectRow.sort,
            isAdmin: selectRow.isAdmin,
            roleId: selectRow.roleId
          })
        }else{
          message.error('请先选择用户')
        }

        break;
    }
  }


  const onAddUser=async (values)=>{
    const {username, password, isAdmin, roleId, sort} = values

    if(edit){
      await postEditUser({
        username,
        password,
        isAdmin,
        roleId,
        sort,
        userId: selectRow._id
      })
    }else{
      await postAddUser({
        username,
        password,
        isAdmin,
        roleId,
        sort
      })
    }



  }

  const renderEditUser=()=>{
    return(
      <Form
        form={form}
        {...layout}
        initialValues={{}}
        onFinish={onAddUser}
      >

        <Form.Item
          label="用户名称"
          name="username"
          rules={[{ required: true, message: '' }]}
        >

          <Input
            placeholder={'用户名称'}
          />
        </Form.Item>

        <Form.Item
          label="用户密码"
          name="password"
          rules={[{ required: true, message: '' }]}
        >

          <Input
            placeholder={'用户密码'}
          />
        </Form.Item>


        <Form.Item
          label="管理员"
          name="isAdmin"
          rules={[{ required: true, message: '' }]}
          valuePropName="checked"
        >
          <Checkbox>
          </Checkbox>
        </Form.Item>


        <Form.Item
          label="所属角色"
          name="roleId"
          rules={[{ required: true, message: '请选择所属角色' }]}
        >

          {renderRoleList(selectRow.roleId)}
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
    )
  }

  const renderRoleList=(value)=>{
    return(
      <Select defaultValue={value}>
        {
          role.map((item)=>{
            return(
              <Option value={item._id} key={item._id}>{item.roleName}</Option>
            )
          })
        }
      </Select>
    )
  }

  const renderAddUser=()=>{
    return(
      <Form
        form={form}
        {...layout}
        initialValues={{isAdmin: false}}
        onFinish={onAddUser}
      >

        <Form.Item
          label="用户名称"
          name="username"
          rules={[{ required: true, message: '' }]}
        >

          <Input
            placeholder={'用户名称'}
          />
        </Form.Item>

        <Form.Item
          label="用户密码"
          name="password"
          rules={[{ required: true, message: '' }]}
        >

          <Input
            placeholder={'用户密码'}
          />
        </Form.Item>


        <Form.Item
          label="管理员"
          name="isAdmin"
          rules={[{ required: true, message: '' }]}
          valuePropName="checked"
        >
          <Checkbox>
          </Checkbox>
        </Form.Item>


        <Form.Item
          label="所属角色"
          name="roleId"
          rules={[{ required: true, message: '' }]}
        >

          {renderRoleList()}
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
    )
  }

  const onClose=()=>{
    setVisible(false)
  }

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

  return(
    <>
      <Table
        dataSource={user}
        columns={columns}
        pagination={false}
        rowKey={'_id'}
        rowSelection={rowSelection}
      />
      <Button onClick={()=>userAction(USER_ACTION.ADD_USER)}>新增</Button>
      <Button onClick={()=>userAction(USER_ACTION.EDIT_USER)}>编辑</Button>
      <Button onClick={()=>userAction(USER_ACTION.DELETE_USER)}>删除</Button>

      <Drawer
        title={edit?"编辑用户":"新增用户"}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={500}
        destroyOnClose={true}
      >

        {
          edit?
            renderEditUser()
            :
            renderAddUser()
        }

      </Drawer>

      <Modal
        title={'删除用户'}
        visible={show}
        centered={true}
        onOk={async ()=>{
          await postDeleteUser({
            userId: selectRow._id
          })
        }}
        onCancel={()=>{
          setShow(false)
        }}
      >
        {`是否要删除用户${selectRow.username}`}
      </Modal>

    </>
  )
}


export default User
