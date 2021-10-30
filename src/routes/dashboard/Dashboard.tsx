import { Button, Card, Col, PageHeader, Row } from 'antd';
import React from 'react';

export const Dashboard: React.VFC = () => (
  <div>
    <Card>
      <PageHeader title="Hi welcome here" />
      <p>I am uctenka app. So far I can only add a new Invoice. Please give it a try!</p>
    </Card>
    <Row>
      <Col span={5}>
        <Card title="Clients">
          <div>Currently you have no clients, try to add one</div>
          <Button shape="circle" size="large" type="primary">
            +
          </Button>
        </Card>
      </Col>
    </Row>
  </div>
);
