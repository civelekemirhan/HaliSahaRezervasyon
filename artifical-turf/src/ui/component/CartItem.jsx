import React from 'react';
import { Card, Button, Checkbox, Typography, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

function CartItem({ item, isChecked, onCheckboxChange, onDelete }) {
  return (
    <Card
      style={{ marginBottom: 16 }}
      type="inner"
      bordered
      title={<Text strong>{item.fieldName}</Text>}
      extra={
        <Space>
          <Checkbox
            checked={isChecked}
            onChange={(e) => onCheckboxChange(item.row_id, e.target.checked)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(item.row_id)}
          >
            Sil
          </Button>
        </Space>
      }
    >
      <Space direction="vertical" size={4}>
        <Text><strong>Ücret (Saatlik):</strong> {item.fieldPrice} ₺</Text>
        <Text><strong>Başlangıç Tarihi:</strong> {item.startDate}</Text>
        <Text><strong>Başlangıç Saati:</strong> {item.startTime}:00</Text>
        <Text><strong>Bitiş Tarihi:</strong> {item.endDate}</Text>
        <Text><strong>Bitiş Saati:</strong> {item.endTime}:00</Text>
      </Space>
    </Card>
  );
}

export default CartItem;
