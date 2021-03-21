import React,{useState, useEffect} from 'react'
import { Menu, Button, Layout } from 'antd';
import {NavLink} from 'react-router-dom';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import {renderRoutes} from "react-router-config";
import * as Action from "../reducer/action";
import {connect} from "react-redux";
import Style from './Style/homeLayout.module.css'
import {useRequest} from "ahooks";
import * as Api from "../api/user";
import SUCCESS from "../api/message";
import * as Tool from '../util/tool'



const { SubMenu } = Menu;

const { Header, Sider, Content, Footer} = Layout;


const arrayToTree=(parentKey, data)=> {

  let temp = []

  for(let index in data){

    if(data[index].parentKey === parentKey){

      data[index].children = arrayToTree(data[index].key, data)

      temp.push(data[index])
    }
  }


  return temp

}

const HomeLayout =(props)=>{

  const [collapsed,toggleCollapse] = useState(false)
  const [menu, setMenu] = useState([])


  const toggleCollapsed = () => {
    toggleCollapse((collapsed)=>{
      return !collapsed
    })
  };

  useEffect(()=>{

  },[])


  useEffect(()=>{


  },[props.menu])


  const renderMenu =(menu)=>{

    return menu.map((item)=>{
      if(item.children.length ===0){
        return(
          <Menu.Item key={item._id} icon={<PieChartOutlined />}>
            <NavLink to={`/${item.route}`}>
              {item.name}
            </NavLink>
          </Menu.Item>
        )
      }else{
        return (
          <SubMenu key={item._id} icon={<MailOutlined />} title={item.name}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
    })
  }


  return(
    <Layout className={Style.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>

        <Menu
          defaultSelectedKeys={['home']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          {
            renderMenu(props.menu)
          }

        </Menu>
      </Sider>

      <Layout>
        <Header>
          <Button type="primary" onClick={toggleCollapsed}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
        </Header>
        <Content
        >
          {renderRoutes(props.route.routes)}
        </Content>
      </Layout>
    </Layout>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
