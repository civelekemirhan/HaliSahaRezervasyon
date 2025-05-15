import { Button, Form, Input, Card, Typography, Layout, Row, Col } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addField } from '../../api/Repository';

const { Title } = Typography;
const { Content } = Layout;

function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onAddFieldHandle = async (values) => {
    setLoading(true);
    const result = await addField(values);
    setLoading(false);

    if (result.message != null) {
      alert(result.message);
    }
  };

  const onFinish = (values) => {
    onAddFieldHandle(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #003b34, #00796b)' }}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col xs={22} sm={18} md={14} lg={10} xl={8}>
            <Card
              bordered={false}
              style={{
                borderRadius: 12,
                padding: '32px 24px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                backgroundColor: 'rgba(255,255,255,0.95)',
              }}
            >
              <Title level={3} style={{ textAlign: 'center', color: '#1c274a', marginBottom: 32 }}>
                HALISAHA EKLE
              </Title>

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
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default AdminPage;
