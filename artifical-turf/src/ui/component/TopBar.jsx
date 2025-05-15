import React from 'react';
import { Layout, Menu, Typography, Space, Tooltip, Button } from 'antd';
import {
  ShoppingCartOutlined,
  LogoutOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../data/UserContext';

const { Header } = Layout;
const { Text } = Typography;

function TopBar() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUser();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToReservations = () => {
    navigate('/pastreservations');
  };

  const goToHome = () => {
    navigate('/home');
  };

  return (
    <Header
      style={{
        backgroundColor: '#00796b',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 40px',
      }}
    >
      <Text style={{ color: 'white', fontSize: '18px' }}>
        {currentUser?.userName || 'Kullanıcı'}
      </Text>

      <div
        style={{
          cursor: 'pointer',
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'white',
          transition: 'color 0.3s',
        }}
        onClick={goToHome}
        onMouseOver={(e) => (e.target.style.color = '#afbc00')}
        onMouseOut={(e) => (e.target.style.color = 'white')}
      >
        HALISAHA REZERVASYON
      </div>

      <Space size="large">
        <Tooltip title="Sepetim">
          <ShoppingCartOutlined
            style={{ fontSize: '24px', color: 'white' }}
            onClick={goToCart}
          />
        </Tooltip>

        <Tooltip title="Geçmiş Rezervasyonlar">
          <HistoryOutlined
            style={{ fontSize: '24px', color: 'white' }}
            onClick={goToReservations}
          />
        </Tooltip>

        <Tooltip title="Çıkış Yap">
          <LogoutOutlined
            style={{ fontSize: '24px', color: 'white' }}
            onClick={handleLogout}
          />
        </Tooltip>
      </Space>
    </Header>
  );
}

export default TopBar;
