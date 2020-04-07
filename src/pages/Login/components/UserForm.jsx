import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { login } from '@/api/index';

export default function UserForm({
  style,
  titleTrigger,
  identityTrigger,
  toggleLogin,
}) {
  const [registerVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async values => {
    setLoading(true);
    if (!registerVisible) {
      const { data } = await login('user', values);
      if (data && data.success) {
        localStorage.setItem('identity', 'User');
        sessionStorage.setItem('token', data.bearToken);
        toggleLogin(true);
      }
    } else {
      //  调用注册接口
    }
    setLoading(false);
  };

  const changeVisible = () => {
    form.resetFields();
    titleTrigger(!registerVisible ? '注 册 用 户' : '用 户 登 录');
    setVisible(!registerVisible);
  };

  const identityChange = () => {
    titleTrigger('管 理 员 登 录');
    identityTrigger('admin');
  };

  return (
    <Form
      name="user-login"
      className="login-form"
      style={style}
      form={form}
      initialValues={{ email: '', password: '' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: '邮箱不能为空!' }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
      </Form.Item>
      <div
        className="animation-item"
        style={
          registerVisible
            ? { height: '40px', marginBottom: '24px' }
            : { height: '0' }
        }
      >
        {registerVisible ? (
          <Form.Item
            name="username"
            rules={[{ required: true, message: '用户名不能为空!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>
        ) : null}
      </div>
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
      <Form.Item>
        <Button
          className="register-button"
          size="small"
          type="link"
          onClick={changeVisible}
          disabled={loading}
        >
          {registerVisible ? '已有账号，点击登录~' : '还没有账号？点击注册~'}
        </Button>
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
          {registerVisible ? '注册' : '登录'}
        </Button>
        {registerVisible ? null : (
          <Button
            type="link"
            size="small"
            style={{ float: 'right', marginTop: '10px' }}
            onClick={identityChange}
            disabled={loading}
          >
            管理员登录 {'>'}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
}
