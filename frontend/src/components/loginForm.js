import React from 'react';
import { Button, Form, Input, message } from 'antd';
import '../styles/loginForm.css'
import axios from 'axios';

const onFinish = async (values)  => {
  try {
    const res = await axios.post('/api/login', values);
    if (res.data.success) {
      message.success(res.data.message);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard';
    } else {
      message.error(res.data.message);
    }
  } catch (err) {
    message.error(err.response?.data?.message || 'Server error');
  }
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const LoginForm = () => (
  <Form
    className="loginForm"
    name="basic"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >

    <p>Login to continue</p>
    
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

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default LoginForm;