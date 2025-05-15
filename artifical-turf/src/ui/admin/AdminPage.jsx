import { Button, Form, Input, Card, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addField } from '../../api/Repository';

const { Title } = Typography;

function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onAddFieldHandle = async (values) => {
    setLoading(true);
    const result = await addField(values);
    setLoading(false);

    console.log(result.success);
    if(result.message !=null) {
      alert(result.message)
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    onAddFieldHandle(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #003b34, #00796b)',
      padding: '24px'
    }}>
      <Card style={{ width: 400 }} bordered={false}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>Halısaha Ekle</Title>
        <Form
          layout="vertical"
          name="addFieldForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Halısaha Adı"
            name="fieldName"
            rules={[{ required: true, message: 'Lütfen Halısaha Adı giriniz!' }]}
          >
            <Input placeholder="Örn: Yıldız Halısaha" />
          </Form.Item>

          <Form.Item
            label="Halısaha Ücreti"
            name="fieldPrice"
            rules={[{ required: true, message: 'Lütfen Halısaha Ücreti giriniz!' }]}
          >
            <Input placeholder="Örn: 300₺" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Halısaha Ekle
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AdminPage;
