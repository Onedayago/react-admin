import React, {useState, useEffect} from 'react'
import {Button, Drawer, Form, Input, Select, Table, InputNumber, message, Modal} from 'antd'
import routes from '../router/index';
import * as Tool from "../util/tool";
import { useRequest } from 'ahooks';
import * as Api from "../api/user";
import SUCCESS from "../api/message";
import * as Action from "../reducer/action";
import {connect} from "react-redux";


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
  },
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
  }
];

const MENU_ACTION = {
  ADD_MENU: 'addMenu',
  EDIT_MENU: 'editMenu',
  DELETE_MENU: 'deleteMenu'
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};


const { Option } = Select;

const ManageV2=(props)=>{

  const [selectedRowKeys, setSelectRowKeys] = useState([])
  const [menu, setMenu] = useState([])  //菜单数据
  const [selectRow, setSelectRow] = useState({})
  const [visible, setVisible] = useState(false)
  const [edit, setEdit] = useState(false)
  const [route, setRoute] = useState([])  //设置可选择的路由
  const [form] = Form.useForm();  //获取表单

  const [show, setShow] = useState(false)

  /**
   * 页面首次渲染
   * */
  useEffect(async () => {

    setRoute(Tool.routesToAarrayFun(routes))

    await postGetMenu()

  },[])

  /**
   * 修改菜单接口
   * */
  const {run:postUpdateMenu } = useRequest(Api.updateMenu, {
    manual: true,
    onSuccess: async (result) => {
      if(result.code === SUCCESS.UpdateMenuSuccess.code){
        message.success('修改菜单成功')
        setVisible(false)
        await postGetMenu()
      }else{
        message.error(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });


  /**
   * 删除菜单接口
   * */
  const {run:postDeleteMenu } = useRequest(Api.deleteMenu, {
    manual: true,
    onSuccess: async (result) => {
      if(result.code === SUCCESS.DeleteMenuSuccess.code){
        setShow(false)
        message.success('删除菜单成功')
        await postGetMenu()
      }else{
        message.error(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  /**
   * 加载菜单接口
   * */
  const {run:postGetMenu } = useRequest(Api.getMenu, {
    manual: true,
    onSuccess: (result) => {
      if(result.code === SUCCESS.GetMenuSuccess.code){

        let temp = Tool.arrayToTree("",JSON.parse(JSON.stringify(result.data)))

        setMenu(temp)

        props.addMenu(result.data)
      }else{
        message.error(result.msg)

      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  /**
   * 添加新菜单接口
   * */
  const {run:postAddMenu } = useRequest(Api.addMenu, {
    manual: true,
    onSuccess: async (result) => {
      if (result.code === SUCCESS.AddMenuSuccess.code) {

        message.success('添加菜单成功')
        setVisible(false)

        await postGetMenu()

      } else {
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

  /**
   * 菜单处理事件
   * */
  const menuAction=async (type)=>{
    switch (type) {
      case MENU_ACTION.ADD_MENU:

        form.setFieldsValue({
          parentName: selectRow.name,
          parentId: selectRow._id
        })
        setEdit(false)
        setVisible(true)

        break;
      case MENU_ACTION.EDIT_MENU:

        if(selectRow.name){

          form.setFieldsValue({
            name: selectRow.name,
            route: selectRow.route,
            _id: selectRow._id,
            name_new: selectRow.name,
            route_new: selectRow.route,
            sort: selectRow.sort
          })

          setEdit(true)
          setVisible(true)
        }else{
          message.error('请先勾选要编辑的菜单')
        }

        break;
      case MENU_ACTION.DELETE_MENU:
        if(selectRow.name){
          setShow(true)
        }else{
          message.error('请先勾选要删除的菜单')
        }
        break;
      default:
        break;
    }
  }

  /**
   * 新增菜单
   * */
  const onAddMenu=async (values)=>{

    setSelectRowKeys([])
    setSelectRow({})

    const {parentId, name, route, sort} = values

    await postAddMenu({
      parentId,
      name,
      route,
      sort,
      isMenu: true
    })

  }


  /**
   * 编辑菜单
   * */
  const onEditMenu=async (values)=>{
    setSelectRowKeys([])
    setSelectRow({})

    const {_id, name_new:name, route_new:route, sort} = values

    await postUpdateMenu({
      _id,
      name,
      route,
      sort
    })
  }

  const onClose = () =>{
    setVisible(false)
  }


  /**
   * 渲染编辑菜单弹窗
   * */
  const renderEditMenu=()=>{
    return(
      <Form
        form={form}
        {...layout}
        initialValues={{}}
        onFinish={onEditMenu}
      >

        <Form.Item
          label="菜单Id"
          hidden={true}
          name="_id"
          rules={[{ required: false, message: '' }]}
        >

          <Input
            placeholder={'菜单Id'}
            disabled={true}
          />
        </Form.Item>

        <Form.Item
          label="菜单名"
          name="name"
          rules={[{ required: true, message: '请输入菜单名称' }]}
        >
          <Input
            disabled={true}
            placeholder="请输入菜单名称"
          />

        </Form.Item>

        <Form.Item
          label="路由"
          name="route"
          rules={[{ required: true, message: '路由' }]}
        >
          <Input
            disabled={true}
            placeholder="路由"
          />

        </Form.Item>

        <Form.Item
          label="新菜单"
          name="name_new"
          rules={[{ required: true, message: '请输入菜单名称' }]}
        >
          <Input
            placeholder="请输入菜单名称"
          />

        </Form.Item>

        <Form.Item
          label="新路由"
          name="route_new"
          rules={[{ required: true, message: '请输入新路由' }]}
        >
          <Select style={{ width: 180 }} placeholder="请选择一个新路由">
            {
              route.map((item)=>{
                return(
                  <Option value={item.key} key={item.key}>{item.name}</Option>
                )
              })
            }
          </Select>

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
            修改
          </Button>
        </Form.Item>
      </Form>
    )
  }

  /**
   * 渲染新增菜单弹窗
   * */

  const renderAddMenu=()=>{
    return(
      <Form
        form={form}
        {...layout}
        initialValues={{}}
        onFinish={onAddMenu}
      >
        <Form.Item
          label="上级菜单名称"
          name="parentName"
          rules={[{ required: false, message: '' }]}
        >

          <Input
            placeholder={'上级菜单名称'}
            disabled={true}
          />
        </Form.Item>

        <Form.Item
          label="上级菜单Id"
          hidden={true}
          name="parentId"
          rules={[{ required: false, message: '' }]}
        >

          <Input
            placeholder={'上级菜单的路由'}
            disabled={true}
          />
        </Form.Item>

        <Form.Item
          label="新增菜单名"
          name="name"
          rules={[{ required: true, message: '请输入菜单名称' }]}
        >
          <Input
            placeholder="请输入菜单名称"
          />

        </Form.Item>

        <Form.Item
          label="菜单路由"
          name="route"
          rules={[{ required: true, message: '请输入路由' }]}
        >
          <Select style={{  }} placeholder="请选择一个路由">
            {
              route.map((item)=>{
                return(
                  <Option value={item.key} key={item.key}>{item.name}</Option>
                )
              })
            }
          </Select>

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


  return(
    <>
      <Table
        dataSource={menu}
        columns={columns}
        rowSelection={rowSelection}
        pagination={false}
        rowKey={'_id'}
      />

      <Button onClick={()=>menuAction(MENU_ACTION.ADD_MENU)}>新增</Button>
      <Button onClick={()=>menuAction(MENU_ACTION.EDIT_MENU)}>编辑</Button>
      <Button onClick={()=>menuAction(MENU_ACTION.DELETE_MENU)}>删除</Button>

      <Drawer
        title={edit?"编辑菜单":"新增菜单"}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={500}
      >

        {
          edit?
            renderEditMenu()
            :
            renderAddMenu()
        }

      </Drawer>

      <Modal
        title={'删除菜单'}
        visible={show}
        centered={true}
        onOk={async ()=>{
          await postDeleteMenu({
            '_id': selectRow._id
          })
        }}
        onCancel={()=>{
          setShow(false)
        }}
      >
        {`是否要删除菜单${selectRow.name}`}
      </Modal>
    </>
  )
}



const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addMenu: (menu)=>dispatch(Action.addMenu(menu)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ManageV2)
