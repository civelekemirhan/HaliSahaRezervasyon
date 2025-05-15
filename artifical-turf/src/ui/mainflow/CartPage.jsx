import React, { useEffect, useState } from 'react';
import TopBar from '../component/TopBar';
import { getCartListByUserId, createReservation, deleteFromCartList } from '../../api/Repository';
import { useUser } from '../../data/UserContext';
import { Row, Col, Card, Form, Input, Button, message, Typography, Divider } from 'antd';
import CartItem from '../component/CartItem';

const { Title, Text } = Typography;

function CartPage() {
  const [cartList, setCartList] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const { currentUser } = useUser();

  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser?.row_id) {
        const response = await getCartListByUserId(currentUser.row_id);
        setCartList(response);
      }
    };
    fetchData();
  }, [currentUser]);

  const handleCheckboxChange = (row_id, checked) => {
    if (checked) {
      setSelectedRowIds((prev) => [...prev, row_id]);
    } else {
      setSelectedRowIds((prev) => prev.filter((id) => id !== row_id));
    }
  };

  const handleDeleteItem = async (row_id) => {
    try {
      await deleteFromCartList(row_id);
      setCartList((prev) => prev.filter((item) => item.row_id !== row_id));
      setSelectedRowIds((prev) => prev.filter((id) => id !== row_id));
      message.success('Ürün sepetten silindi.');
    } catch (error) {
      message.error('Ürün silinirken hata oluştu.');
    }
  };



  const getTotalPrice = () => {
    const selectedItems = cartList.filter((item) => selectedRowIds.includes(item.row_id));
    return selectedItems
      .reduce((sum, item) => {
        const startDateTime = new Date(`${item.startDate}T${String(item.startTime).padStart(2, '0')}:00:00`);
        const endDateTime = new Date(`${item.endDate}T${String(item.endTime).padStart(2, '0')}:00:00`);
        const timeDiffInMs = endDateTime - startDateTime;
        const hours = Math.max(timeDiffInMs / (1000 * 60 * 60), 1);
        const pricePerHour = parseFloat(item.fieldPrice || 0);
        return sum + pricePerHour * hours;
      }, 0)
      .toFixed(2);
  };

  const handlePayment = async () => {
    const selectedItems = cartList.filter((item) => selectedRowIds.includes(item.row_id));
    if (selectedItems.length === 0) {
      message.warning('Lütfen ödeme yapmak için en az bir ürün seçin.');
      return;
    }

    try {
      const updatedItems = selectedItems.map((item) => ({
        ...item,
        isReserved: true,
      }));

      await Promise.all(updatedItems.map((item) => createReservation(item)));

      message.success('Ödeme başarılı!');
      setCartList((prev) => prev.filter((item) => !selectedRowIds.includes(item.row_id)));
      setSelectedRowIds([]);
      setCardNumber('');
      setCvv('');
      setExpiry('');
    } catch (error) {
      message.error('Rezervasyon sırasında hata oluştu.');
    }
  };

  return (
    <>
      <TopBar />
      <div style={{ maxWidth: 1000, margin: '50px auto', padding: 20 }}>
        <Title level={2} style={{ marginBottom: 20, textAlign: 'center' }}>
          Sepetim
        </Title>

        {cartList.length === 0 ? (
          <Text type="secondary" style={{ fontSize: 18, display: 'block', textAlign: 'center', marginTop: 50 }}>
            Sepette ürün yok.
          </Text>
        ) : (
          <Row gutter={24}>
            <Col xs={24} md={16}>
              {cartList.map((item) => (
                <CartItem
                  key={item.row_id}
                  item={item}
                  isChecked={selectedRowIds.includes(item.row_id)}
                  onCheckboxChange={handleCheckboxChange}
                  onDelete={handleDeleteItem} 
                />
              ))}
            </Col>

            <Col xs={24} md={8}>
              <Card title="💳 Ödeme Özeti">
                <Text strong style={{ fontSize: 16 }}>
                  Toplam Tutar: {getTotalPrice()} TL
                </Text>

                <Divider />

                <Form layout="vertical" onFinish={handlePayment}>
                  <Form.Item
                    label="Kart Numarası"
                    name="cardNumber"
                    rules={[
                      { required: true, message: 'Kart numarası giriniz' },
                      { pattern: /^\d{16}$/, message: 'Geçerli bir kart numarası giriniz (16 haneli)' },
                    ]}
                  >
                    <Input
                      value={cardNumber}
                      maxLength={16}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/\D/g, '');
                        setCardNumber(onlyNums);
                      }}
                      placeholder="1234 5678 9012 3456"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Son Kullanma Tarihi"
                    name="expiry"
                    rules={[{ required: true, message: 'Son kullanma tarihini giriniz' }]}
                  >
                    <Input
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => {
                        const onlyAllowed = e.target.value.replace(/[^0-9/]/g, '');
                        setExpiry(onlyAllowed);
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="CVV"
                    name="cvv"
                    rules={[
                      { required: true, message: 'CVV giriniz' },
                      { pattern: /^\d{3}$/, message: 'CVV 3 haneli olmalıdır' },
                    ]}
                  >
                    <Input
                      value={cvv}
                      maxLength={3}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/\D/g, '');
                        setCvv(onlyNums);
                      }}
                      placeholder="123"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={selectedRowIds.length === 0}
                      block
                    >
                      Ödeme Yap
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default CartPage;
