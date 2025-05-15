import React from 'react';
import { Layout, Typography, Card, Row, Col } from 'antd';
import RegisterForm from '../component/RegisterForm';

const { Content } = Layout;
const { Title } = Typography;

function RegisterPage() {
  const onRegisterHandleBase = (values) => {
    console.log('Register values:', values);
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
              <Title
                level={3}
                style={{ textAlign: 'center', color: '#1c274a', marginBottom: 32 }}
              >
                HALISAHA REZERVASYON SİSTEMİNE <br /> HOŞ GELDİNİZ
              </Title>

              <RegisterForm onRegisterHandle={onRegisterHandleBase} />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default RegisterPage;
