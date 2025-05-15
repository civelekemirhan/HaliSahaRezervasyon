import React, { useEffect, useState } from 'react';
import { Layout, Input, Row, Col, Typography, message } from 'antd';
import TopBar from '../component/TopBar';
import CommonItem from '../component/CommonItem';
import { getAllFields } from '../../api/Repository';

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

function MainPage() {
  const [fields, setFields] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await getAllFields();
        setFields(response.data.data);
      } catch (error) {
        message.error("Halı sahalar alınırken hata oluştu.");
        console.error(error);
      }
    };

    fetchFields();
  }, []);

  const filteredFields = fields.filter(field =>
    field.fieldName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <TopBar />
      <Content style={{ padding: '40px 20px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Title level={2} style={{ color: 'black', textAlign: 'center', marginBottom: 32 }}>
          Halı Sahalar
        </Title>

        <Search
          placeholder="Saha adına göre ara..."
          allowClear
          onChange={(e) => setSearchTerm(e.target.value)}
          enterButton={false}
          size="large"
          style={{ marginBottom: 32 }}
        />

        <Row gutter={[24, 24]}>
          {filteredFields.length === 0 ? (
            <Col span={24}>
              <Typography.Text style={{ color: 'white', fontSize: 18, textAlign: 'center', display: 'block' }}>
                Aradığınız kriterlere uygun saha bulunamadı.
              </Typography.Text>
            </Col>
          ) : (
            filteredFields.map((field) => (
              <Col
                key={field.row_id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
              >
                <CommonItem
                  fieldId={field.row_id}
                  fieldName={field.fieldName}
                  fieldPrice={field.fieldPrice}
                />
              </Col>
            ))
          )}
        </Row>
      </Content>
    </Layout>
  );
}

export default MainPage;
