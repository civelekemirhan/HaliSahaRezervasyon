import React, { useEffect, useState } from 'react';
import { Typography, List, message } from 'antd';
import TopBar from '../component/TopBar';
import { useUser } from '../../data/UserContext';
import { getAllReservesOnPage } from '../../api/Repository';
import ReservedItem from '../component/ReservedItem';

const { Title, Text } = Typography;

function PastReservations() {
  const { currentUser } = useUser();
  const [pastReservations, setPastReservations] = useState([]);

  useEffect(() => {
    const fetchPastReservations = async () => {
      if (currentUser?.row_id) {
        try {
          const response = await getAllReservesOnPage(currentUser.row_id);
          setPastReservations(response);
        } catch (error) {
          message.error('Geçmiş rezervasyonlar alınırken hata oluştu.');
          console.error(error);
        }
      }
    };

    fetchPastReservations();
  }, [currentUser]);

  return (
    <>
      <TopBar />
      <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 20px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
          Geçmiş Rezervasyonlar
        </Title>

        {pastReservations.length === 0 ? (
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              display: 'block',
              marginTop: 50,
              color: '#888',
            }}
          >
            Geçmiş rezervasyon bulunamadı.
          </Text>
        ) : (
          <List
            dataSource={pastReservations}
            renderItem={(item) => (
              <List.Item key={item.row_id} style={{ padding: 0, marginBottom: 16 }}>
                <ReservedItem item={item} />
              </List.Item>
            )}
          />
        )}
      </div>
    </>
  );
}

export default PastReservations;
