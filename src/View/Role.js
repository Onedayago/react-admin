

import React, {useState, useEffect} from 'react'
import {Button, Form, Input, Modal, Table} from 'antd';
import MenuBtnList from '../component/menuBtnList'
import PageBtn from '../constant/PageBtn'
import * as Action from "../reducer/action";
import {connect} from "react-redux";


const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
  },
  {
    key: '2',
    name: '胡彦祖',
  },
];

const columns = [
  {
    title: '角色名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '功能',
    key: 'action',
    render:()=>{
      return(
        <>
          <Button>编辑</Button>
          <Button>删除</Button>
          <Button>禁用</Button>
        </>
      )
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
];

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};




const Role=(props)=>{

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roleRoute, setRoleRoute] = useState(new Set())
  const [roleBtn, setRoleBtn] = useState(new Set([]))

  const [roles, setRoles] = useState([])


  const [form] = Form.useForm();


  useEffect(()=>{

    let temp = []
    props.role.forEach((item, index)=>{
      let obj = {
        key: index,
        name: item.name
      }

      temp.push(obj)
    })

    setRoles(temp)

  },[props.role])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onAdd = (values)=>{

    let role = {
      name: values.name,
      route: Array.from(roleRoute),
      btn: Array.from(roleBtn)
    }

    let index = props.role.findIndex((item)=>item.name === values.name)

    if(index === -1){
      props.addRole(role)
    }else{
      alert('重复，添加失败')
      return;
    }
    setIsModalVisible(false);

  }

  const changeRoute = (res)=>{


    let temp = new Set([...roleRoute])

    if(res.add){
      temp.add(res.route)
      setRoleRoute(temp)
    }else{
      temp.delete(res.route)

      let temp2 =new Set([...roleBtn].filter(val => {

        return val.indexOf(res.route) ===-1

      }));

      setRoleBtn(temp2);
      setRoleRoute(temp)
    }
  }

  const changeBtn = (res) =>{


    let temp = new Set([...roleBtn])

    if(res.add){
      temp.add(res.btn)
      setRoleBtn(temp)
    }else{
      temp.delete(res.btn)
      setRoleBtn(temp)
    }
  }

  const edit = (values) =>{
    setIsModalVisible(true);


  }

  const deleteRole = (values) =>{

    let temp = props.role.filter((item)=>item.name !== values.name)

    props.deleteRole(temp)

  }

  const renderItem = () =>{
    return [
      {
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '功能',
        key: 'action',
        render:(values)=>{
          return(
            <>
              <Button onClick={()=>edit(values)}>编辑</Button>
              <Button onClick={()=>deleteRole(values)}>删除</Button>
              <Button>禁用</Button>
            </>
          )
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      },
    ]
  }


  return(
    <>
      <Table dataSource={roles} columns={renderItem()} />

      <Button onClick={showModal}>添加新角色</Button>



      <Modal title="新增角色" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          {...layout}
          initialValues={{parentKey: '' }}
          onFinish={onAdd}
        >
          <Form.Item
            label="角色名"
            name="name"
            rules={[{ required: true, message: '' }]}
          >

            <Input
              placeholder={'角色名'}
            />
          </Form.Item>

          <div>

            {Object.keys(PageBtn).map(item => {

                let name = PageBtn[item].name
                let routes = PageBtn[item].routes

                return(
                  <MenuBtnList
                    key={item}
                    route={item}
                    name={name}
                    btn={routes}
                    changeRoute={changeRoute}
                    changeBtn={changeBtn}
                  />
                )
              }
            )}


          </div>


          <Form.Item
            name="editBtn"
          >
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}



const mapStateToProps = (state, ownProps) => {
  return {
    role: state.UserReducer.role
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addRole: (role)=>dispatch(Action.addRole(role)),
    deleteRole: (role)=>dispatch(Action.deleteRole(role))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Role)
