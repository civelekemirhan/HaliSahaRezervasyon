import React from 'react';
import { Card, Descriptions, Button, message, Popconfirm } from 'antd';
import { cancelReservation } from '../../api/Repository';

function ReservedItem({ item }) {
  const handleCancel = async () => {
    try {
      console.log(item)
      await cancelReservation(item);
      message.success('Rezervasyon iptal edildi.');
    } catch (error) {
      message.error('Rezervasyon iptal edilemedi.');
    }
  };

  return (
    <Card
      type="inner"
      title={item.fieldName}
      style={{ marginBottom: 16 }}
      extra={
        <Popconfirm
          title="Rezervasyonu iptal etmek istediğinize emin misiniz?"
          onConfirm={handleCancel}
          okText="Evet"
          cancelText="Hayır"
        >
          <Button style={{background:'red'}} type="primary">
            İptal Et
          </Button>
        </Popconfirm>
      }
    >
      <Descriptions column={1} size="middle">
        <Descriptions.Item label="Ücret (Saatlik)">
          {item.fieldPrice} ₺
        </Descriptions.Item>
        <Descriptions.Item label="Başlangıç Tarihi">
          {item.startDate}
        </Descriptions.Item>
        <Descriptions.Item label="Başlangıç Saati">
          {item.startTime}:00
        </Descriptions.Item>
        <Descriptions.Item label="Bitiş Tarihi">
          {item.endDate}
        </Descriptions.Item>
        <Descriptions.Item label="Bitiş Saati">
          {item.endTime}:00
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

export default ReservedItem;
