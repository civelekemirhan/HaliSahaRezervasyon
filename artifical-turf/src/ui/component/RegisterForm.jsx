import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { onRegister } from '../../api/Repository';
import { Link, useNavigate } from 'react-router-dom'; 

function RegisterForm({ onRegisterHandle }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const onFinish = async (values) => {
    if (values.userPass !== values.confirmPass) {
      alert('Şifreler eşleşmiyor!');
      return;
    }

    const data = {
      userName: values.userName,
      userPass: values.userPass,
    };

    setLoading(true); // Loading başlat

    try {
      const response = await onRegister(data); 
      if (response) {
       
        form.resetFields();
        onRegisterHandle(data);
        navigate('/'); 
      }
    } catch (error) {
      console.error('Kayıt sırasında hata oluştu:', error);
    } finally {
      setLoading(false); 
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Başarısız:', errorInfo);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      {loading ? (
        <Spin size="large" /> 
      ) : (
        <Form
          form={form}
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

          <Form.Item
            label="Şifrenizi Doğrulayınız"
            name="confirmPass"
            rules={[{ required: true, message: 'Lütfen şifrenizi tekrar girin!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Kayıt Olun
            </Button>
          </Form.Item>
        </Form>
          
      )}
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <span>Zaten Hesabınız Var mı? </span>
        <Link to="/">Giriş Yapın</Link>
      </div>
    </div>
    
  );
}

export default RegisterForm;
