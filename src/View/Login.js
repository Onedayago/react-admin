import React from 'react';
import styled from "styled-components";
import { Form, Input, Button } from 'antd';

const Bg = styled.div`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  width: 400px;
  height: 400px;
  border-width: 1px;
  background-color: cornflowerblue;
  box-shadow: 0px 0px 10px cornflowerblue;
  border-radius: 10px;
  padding: 40px;
`

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


const Login = () => {


  return(
    <Bg>
      <Content>
        <Form>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Bg>
  )

};

export default Login;
