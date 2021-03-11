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

    let data = JSON.parse(JSON.stringify(props.menu));

    let menu = arrayToTree('', data)

    setMenu(menu);

  },[props.menu])


  const renderMenu =(menu)=>{

    return menu.map((item)=>{
      if(item.children.length ===0){
        return(
          <Menu.Item key={item.key} icon={<PieChartOutlined />}>
            <NavLink to={`/${item.key}`}>
              {item.name}
            </NavLink>
          </Menu.Item>
        )
      }else{
        return (
          <SubMenu key={item.key} icon={<MailOutlined />} title={item.name}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
    })
  }


  return(
    <Layout style={{position: 'absolute', top: 0, left:0, right: 0, bottom: 0}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>

        <Menu
          defaultSelectedKeys={['home']}
          // defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          {
            renderMenu(menu)
          }

        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
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
