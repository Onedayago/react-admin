import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {login} from '../api/user'
import SUCCESS from '../api/message'
import Style from './Style/loginStyle.module.css'
import * as Storage from '../util/Storage'
import * as Tool from "../util/tool";
import * as Action from "../reducer/action";
import {connect} from "react-redux";
import {useHistory} from 'react-router'

const Login = (props) => {


  const history = useHistory()

  const { loading, run:runLogin } = useRequest(login, {
    manual: true,
    onSuccess: (result) => {

      console.log(result)
      if(result.code === SUCCESS.loginSuccess.code){

        Storage.SaveToken(result.data.token, true)

        props.addMenu(result.data.menu)

        history.push('/')

      }else{
        alert(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  const onLogin = async(values)=>{

    const {username, password} = values

    await runLogin({
      username,
      password
    })
  }

  return(
    <div  className={Style.container}>


      <div className={Style.content}>
        <Form
          onFinish={onLogin}
          initialValues={{
            username: 'liushun',
            password: '123456'
          }}
        >
          <Form.Item
            label=""
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              className={Style.login_input}
              placeholder={'账号'}
              prefix={<UserOutlined/>}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              className={Style.login_input}
              visibilityToggle={false}
              placeholder={'密码'}
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button  htmlType="submit" className={Style.login_btn} disabled={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )

};

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addMenu: (menu)=>dispatch(Action.addMenu(menu)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Login)

