import React, { useState } from 'react';
import { Layout, Typography, Card, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { onLogin } from '../../api/Repository';
import { useUser } from '../../data/UserContext';
import LoginForm from '../component/LoginForm';

const { Content } = Layout;
const { Title } = Typography;

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useUser();

  const onLoginHandle = async (values) => {
    setLoading(true);
    const result = await onLogin(values);
    setLoading(false);

    if (result.isAdmin) {
      navigate('/admin');
      return;
    }

    if (result.success) {
      message.success('Giriş başarılı!');
      setCurrentUser(result.user);
      alert("Giriş Başarılı");
      navigate('/home');
    } else {
      message.error(result.message || 'Giriş başarısız.');
      alert("Giriş Başarısız");
    }
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

              <LoginForm onLoginHandle={onLoginHandle} loading={loading} />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default LoginPage;
