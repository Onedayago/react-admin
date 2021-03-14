import React from 'react';
import { Form, Input, Button } from 'antd';
import * as IMG from '../constant/img'
import {Bg, Content, login_input, login_btn} from './Style/LoginStyle'
import { LockOutlined, UserOutlined } from '@ant-design/icons';



const Login = () => {


  return(
    <Bg bg={IMG.bg}>

      <Content>
        <Form>
          <Form.Item
            label=""
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              style={login_input}
              placeholder={'账号'}
              prefix={<UserOutlined/>}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              style={login_input}
              visibilityToggle={false}
              placeholder={'密码'}
              prefix={<LockOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button  htmlType="submit" style={login_btn}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Bg>
  )

};

export default Login;
