import React, {useState, useEffect} from 'react'
import {Button, Drawer, Form, Input, Tree, Select} from 'antd';
import * as Action from "../reducer/action";
import {connect} from "react-redux";
import routes from '../router/index';
import * as Tool from '../util/tool'


const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};


const { Option } = Select;




const Manage =(props)=> {

  const [menu, setMenu] = useState([

  ])

  const [checkedKey, setCheckedKey] = useState([])

  const [route, setRoute] = useState([])

  const [visible, setVisible] = useState(false)

  const [name, setName] = useState('')

  const [edit, setEdit] = useState(false)

  const [form] = Form.useForm();

  useEffect(()=>{

    let data = JSON.parse(JSON.stringify(props.menu));

    console.log(data)
    let menu = Tool.arrayToTree('', data)
    console.log(menu)
    setMenu(menu)

  },[props.menu])

  useEffect(()=>{


    let temp = Tool.routesToAarrayFun(routes)

    setRoute(temp)

  },[])



  const onDrop = info => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...menu];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }




    console.log(data)
    setMenu(data)


    let temp = Tool.treeToArrayFun(JSON.parse(JSON.stringify(data)), '')
    console.log(temp)

    props.deleteMenu(temp)

  };

  const onCheck = (checkedKeysValue, e) => {

    console.log(e)

    if(checkedKey.includes(e.node.key)){
      setCheckedKey([])
      setName('')
    }else{
      setName(e.node.title)
      setCheckedKey([e.node.key])
    }
  };

  const addMenu = () => {

    if(checkedKey.length > 0){
      form.setFieldsValue({
        parentName: name,
        parentKey: checkedKey[0],
      })
    }else{
      form.setFieldsValue({
        parentName: '',
        parentKey: '',
      })
    }

    setVisible(true)
    setEdit(false)

  }

  /**
   * 编辑菜单
   * */
  const editMenu =()=>{

    if(checkedKey.length<=0){
      alert('请先选中')
      return;
    }

    form.setFieldsValue({
      name: name,
      key: checkedKey[0],
    })
    setVisible(true);
    setEdit(true);

  }

  /**
   * 删除菜单
   * */
  const deleteMenu =()=>{

    if(checkedKey.length <= 0){
      alert('请先选中')
      return;
    }

    let index = props.menu.findIndex((item)=>{
      return item.parentKey === checkedKey[0]
    })

    let newMenu = props.menu.filter(item => item.key !== checkedKey[0])


    if(index === -1){
      props.deleteMenu(newMenu)
    }else{
      alert('请先删除子项')
      return;
    }
  }

  const onClose = ()=>{

    setVisible(false)
  }

  const onEdit = (values)=>{

    const {name, key, name_new, key_new} = values


    let index = props.menu.findIndex((item)=>{
      return item.name === name_new && item.key ===key_new
    })

    let newMenu = props.menu.map((item)=>{
      if(item.name === name || item.key === key){
        item.name = name_new
        item.key = key_new
        item.title = name_new
      }
      return item
    })


    if(index === -1){
      props.editMenu(newMenu)
    }else{
      alert('重复，添加失败')
      return;
    }

    setVisible(false);
  }

  const onAdd = (values) =>{


    const {parentKey, name, key} = values

    let obj = {
      name,
      key,
      parentKey: parentKey,
      title: name,
    }

    let index = props.menu.findIndex((item)=>{
      return item.name === name && item.key ===key
    })


    if(index === -1){
      props.addMenu(obj)
    }else{
      alert('重复，添加失败')
      return;
    }

    setVisible(false);


  }


  const handleChange=(values)=>{
    console.log(values)
  }

  return (
    <>
      <Tree
        className="draggable-tree"
        checkStrictly={true}
        draggable
        blockNode
        multiple={false}
        onDrop={onDrop}
        treeData={menu}
        checkable
        onCheck={onCheck}
        checkedKeys={checkedKey}
      />

      <Button onClick={addMenu}>新增</Button>
      <Button onClick={editMenu}>编辑</Button>
      <Button onClick={deleteMenu}>删除</Button>


      <Drawer
        title="新增菜单"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={500}
      >

        {
          edit?
            <Form
              form={form}
              {...layout}
              initialValues={{}}
              onFinish={onEdit}
            >

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
                name="key"
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
                name="key_new"
                rules={[{ required: true, message: '请输入新路由' }]}
              >
                <Select style={{ width: 180 }} placeholder="请选择一个新路由" onChange={handleChange}>
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
                name="editBtn"
              >
                <Button type="primary" htmlType="submit">
                  修改
                </Button>
              </Form.Item>
            </Form>
            :
            <Form
              form={form}
              {...layout}
              initialValues={{parentKey: '' }}
              onFinish={onAdd}
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
                label="上级菜单路由"
                name="parentKey"
                rules={[{ required: false, message: '' }]}
              >

                <Input
                  placeholder={'上级菜单的路由'}
                  disabled={true}
                />
              </Form.Item>

              <Form.Item
                label="菜单名"
                name="name"
                rules={[{ required: true, message: '请输入菜单名称' }]}
              >
                <Input
                  placeholder="请输入菜单名称"
                />

              </Form.Item>

              <Form.Item
                label="路由"
                name="key"
                rules={[{ required: true, message: '请输入路由' }]}
              >
                <Select style={{ width: 180 }} placeholder="请选择一个路由" onChange={handleChange}>
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
                name="editBtn"
              >
                <Button type="primary" htmlType="submit">
                  确认
                </Button>
              </Form.Item>
            </Form>
        }

      </Drawer>

    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    menu: state.UserReducer.menu
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addMenu: (menu)=>dispatch(Action.addMenu(menu)),
    deleteMenu: (menu)=>dispatch(Action.deleteMenu(menu)),
    editMenu: (menu)=>dispatch(Action.editMenu(menu)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage);


