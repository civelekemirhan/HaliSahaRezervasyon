import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Modal, DatePicker, TimePicker, message } from 'antd';
import dayjs from 'dayjs';
import { useUser } from '../../data/UserContext';
import { addToCart, getAllReserves } from '../../api/Repository';

const { Title, Text } = Typography;

// 🔹 Belirli bir tarih için rezerve edilmiş saatleri hesaplar
function getDisabledHoursForDate(date, reserves) {
  const disabled = new Set();
  const targetDate = dayjs(date).format('YYYY-MM-DD');

  reserves.forEach((r) => {
    const start = dayjs(`${r.startDate} ${r.startTime}`, 'YYYY-MM-DD HH');
    const end = dayjs(`${r.endDate} ${r.endTime}`, 'YYYY-MM-DD HH');

    for (let d = start; d.isBefore(end); d = d.add(1, 'hour')) {
      if (d.format('YYYY-MM-DD') === targetDate) {
        disabled.add(d.hour());
      }
    }
  });

  return Array.from(disabled).sort((a, b) => a - b);
}

function CommonItem({ fieldId, fieldName, fieldPrice }) {
  const { currentUser } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedFirstTime, setSelectedFirstTime] = useState(null);
  const [selectedLastDate, setSelectedLastDate] = useState(null);
  const [selectedLastTime, setSelectedLastTime] = useState(null);
  const [reserves, setReserves] = useState([]);
  const [disabledStartHours, setDisabledStartHours] = useState([]);
  const [disabledEndHours, setDisabledEndHours] = useState([]);

  const showModal = () => setIsModalOpen(true);

  const resetModal = () => {
    setIsModalOpen(false);
    setSelectedStartDate(null);
    setSelectedFirstTime(null);
    setSelectedLastDate(null);
    setSelectedLastTime(null);
    setDisabledStartHours([]);
    setDisabledEndHours([]);
    setReserves([]);
  };

  const handleOk = () => {
    if (!selectedStartDate || !selectedFirstTime || !selectedLastDate || !selectedLastTime) {
      message.warning("Lütfen tüm alanları doldurun.");
      return;
    }

    const reservation = {
      userId: currentUser?.row_id || 2,
      fieldId,
      fieldName,
      fieldPrice,
      startDate: selectedStartDate.format('YYYY-MM-DD'),
      startTime: selectedFirstTime.format('HH'),
      endDate: selectedLastDate.format('YYYY-MM-DD'),
      endTime: selectedLastTime.format('HH'),
      isReserved: false,
    };

    console.log('Rezervasyon Gönderiliyor:', reservation);
    addToCart(reservation);
    message.success("Rezervasyon sepete eklendi!");
    resetModal();
  };

  useEffect(() => {
    if (isModalOpen) {
      getAllReserves(fieldId).then((data) => setReserves(data));
    }
  }, [isModalOpen, fieldId]);

  useEffect(() => {
    if (selectedStartDate) {
      const disabled = getDisabledHoursForDate(selectedStartDate, reserves);
      setDisabledStartHours(disabled);
    }
  }, [selectedStartDate, reserves]);

  useEffect(() => {
    if (selectedLastDate) {
      const disabled = getDisabledHoursForDate(selectedLastDate, reserves);
      setDisabledEndHours(disabled);
    }
  }, [selectedLastDate, reserves]);

  return (
    <>
      <Card
        hoverable
        style={{ width: '100%', borderRadius: 12 }}
        bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 200 }}
      >
        <div>
          <Title level={4}>{fieldName}</Title>
          <Text type="secondary">{fieldPrice} TL / Gün</Text>
        </div>

        <Button type="primary" block onClick={showModal}>
          Detaylar
        </Button>
      </Card>

      <Modal
        title="Rezervasyon Yap"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={resetModal}
        okText="Onayla"
        cancelText="İptal"
      >
        <Text strong>Başlangıç Tarihi:</Text>
        <DatePicker
          onChange={setSelectedStartDate}
          style={{ width: '100%', marginBottom: 12 }}
        />

        <Text strong>Başlangıç Saati:</Text>
        <TimePicker
          onChange={setSelectedFirstTime}
          style={{ width: '100%', marginBottom: 16 }}
          format="HH"
          disabled={!selectedStartDate}
          disabledHours={() => disabledStartHours}
        />

        <Text strong>Bitiş Tarihi:</Text>
        <DatePicker
          onChange={setSelectedLastDate}
          style={{ width: '100%', marginBottom: 12 }}
        />

        <Text strong>Bitiş Saati:</Text>
        <TimePicker
          onChange={setSelectedLastTime}
          style={{ width: '100%' }}
          format="HH"
          disabled={!selectedLastDate}
          disabledHours={() => disabledEndHours}
        />
      </Modal>
    </>
  );
}

export default CommonItem;
