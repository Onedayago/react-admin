

import React, {useState} from 'react'
import {Table, Button, Modal, Form, Input, Select} from 'antd';


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
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  },
];

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};


const { Option } = Select;


const User=()=>{

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onAdd = ()=>{

  }

  return(
    <>
      <Table dataSource={dataSource} columns={columns} />
      <Button onClick={showModal}>添加新用户</Button>


      <Modal title="新增用户" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          {...layout}
          initialValues={{parentKey: '' }}
          onFinish={onAdd}
        >
          <Form.Item
            label="用户名"
            name="parentName"
            rules={[{ required: true, message: '' }]}
          >

            <Input
              placeholder={'用户名'}
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="parentKey"
            rules={[{ required: true, message: '' }]}
          >

            <Input
              placeholder={'密码'}
            />
          </Form.Item>

          <Form.Item
            label="角色"
            name="name"
            rules={[{ required: true, message: '角色' }]}
          >
            <Input
              placeholder="角色"
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
      </Modal>
    </>
  )
}


export default User
