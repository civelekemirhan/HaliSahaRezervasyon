import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

function LoginForm({ onLoginHandle, loading }) {
  const onFinish = async (values) => {
    console.log('Success:', values);
    onLoginHandle(values); // Loading parent’ta kontrol ediliyor
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Kullanıcı Adı"
          name="userName"
          rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="userPass"
          rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <span>Hesabınız yok mu? </span>
        <Link to="/register">Kayıt olun</Link>
      </div>
    </div>
  );
}

export default LoginForm;
