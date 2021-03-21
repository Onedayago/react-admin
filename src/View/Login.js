import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {login} from '../api/user'
import SUCCESS from '../api/message'
import Style from './Style/loginStyle.module.css'



const Login = () => {


  const { loading, run:runLogin } = useRequest(login, {
    manual: true,
    onSuccess: (result) => {
      if(result.code === SUCCESS.loginSuccess.code){


      }else{
        alert(result.msg)
      }
    },
    onError: (error)=>{
      console.log(error)

    }
  });

  const onLogin = async()=>{
    await runLogin({
      'username': 'ddd',
      'password': '123456'
    })
  }

  return(
    <div  className={Style.container}>

      <div className={Style.content}>
        <Form
          onFinish={onLogin}
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

export default Login;
