import React,{useState, useEffect} from 'react'
import { Menu, Button, Layout } from 'antd';
import {NavLink} from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MailOutlined,
} from '@ant-design/icons';
import {renderRoutes} from "react-router-config";
import {connect} from "react-redux";
import Style from './Style/homeLayout.module.css'
import * as Storage from '../util/Storage'
import {useHistory} from 'react-router'
import * as Tool from "../util/tool";

const { SubMenu } = Menu;

const { Header, Sider, Content} = Layout;


const HomeLayout =(props)=>{

  const [collapsed,toggleCollapse] = useState(false)
  const [menu, setMenu] = useState([])


  const history = useHistory()

  const toggleCollapsed = () => {
    toggleCollapse((collapsed)=>{
      return !collapsed
    })
  };


  useEffect(()=>{

    let temp = Tool.arrayToTree("",JSON.parse(JSON.stringify(props.menu)))

    setMenu(temp)

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
        >
          <Menu.Item key={'/'} icon={<PieChartOutlined />}>
            <NavLink to={'/'}>
              首页
            </NavLink>
          </Menu.Item>

          {
            renderMenu(menu)
          }

        </Menu>
      </Sider>

      <Layout>
        <Header>
          <Button type="primary" onClick={toggleCollapsed}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
          <Button onClick={()=>{
            Storage.RemoveToken()
            history.push('/login')
          }}>退出登录</Button>
        </Header>
        <Content
        >
          {renderRoutes(props.route.routes, {menu: props.menu})}
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
