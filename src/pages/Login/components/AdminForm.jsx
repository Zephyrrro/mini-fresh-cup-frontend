import React, { useState } from 'react';
import { Input, Form, Button, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { login } from '@/api/index';

export default function AdminForm({
  titleTrigger,
  identityTrigger,
  toggleLogin,
}) {
  const [loading, setLoading] = useState(false);
  const [from] = Form.useForm();

  const onFinish = async values => {
    setLoading(true);
    const { data } = await login('admin', values);
    if (data && data.success) {
      localStorage.setItem('identity', 'Admin');
      sessionStorage.setItem('token', data.bearToken);
      toggleLogin(true);
    }else{
      message.error("登陆失败！");
    }
    setLoading(false);
  };

  const identityChange = () => {
    titleTrigger('用 户 登 录');
    identityTrigger('user');
  };

  return (
    <Form
      name="admin-login"
      className="login-form"
      form={from}
      style={{ transform: 'translateX(100%)' }}
      initialValues={{ email: '', password: '' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: '邮箱不能为空!' }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '密码不能为空!' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      <Form.Item className="button-container">
        <Button
          type="primary"
          htmlType="submit"
          shape="round"
          size="large"
          className="login-button"
          loading={loading}
        >
          登录
        </Button>
        <Button
          type="link"
          size="small"
          style={{ float: 'left', marginTop: '10px' }}
          disabled={loading}
          onClick={identityChange}
        >
          {'<'} 用户登录
        </Button>
      </Form.Item>
    </Form>
  );
}
