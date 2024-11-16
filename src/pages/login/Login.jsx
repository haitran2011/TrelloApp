import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const bodyData = {
      "data": {
        "email": values.email,
        "password": values.password
      }
    }
    try {
      const respose = await axios.post('https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/user/signin', bodyData);
      const data = respose.data.data;
      window.localStorage.setItem('access_token', data.access_token);
      window.localStorage.setItem('refresh_token', data.refresh_token);
      navigate('/')
    } catch(error) {
      console.log(error) 
    }
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h1 style={{ display: 'flex', margin: 20, justifyContent: 'center', textAlign: 'center'}}> 
        Login 
      </h1>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login