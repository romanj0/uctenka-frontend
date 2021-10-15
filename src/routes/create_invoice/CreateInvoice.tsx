import { useQuery } from '@apollo/client';
import { Button, Card, Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { Date } from '../../components/form/Date/Date';
import { InputNumber } from '../../components/form/Input/InputNumber';
import { ClientsData, GET_CLIENTS } from '../../graphql/queries/Client';

interface Client {
  name: string;
  adress: string;
  ico: string;
  _id: number;
}

export const CreateInvoice: React.VFC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [invoices, setInvoices] = useState<{ item: any }>();

  const { data, error, loading } = useQuery<ClientsData>(GET_CLIENTS);

  const handleOnFinish = (item: any) => {
    console.log(item);

    // axios
    //   .get('/api/invoices')
    //   .then(response => {
    //     setInvoices(response.data);
    //   })
    //   .catch(err => {
    //     // handle error
    //     console.log(err);
    //   })
    //   .then(() => {
    //     // always executed
    //   });
  };

  return (
    <>
      <Card style={{ width: '35%' }}>
        <Form
          labelCol={{
            span: 5,
          }}
          layout="horizontal"
          style={{ marginTop: 50 }}
          onFinish={handleOnFinish}
        >
          <Form.Item label="Supplier" name="supplier">
            <Select placeholder="vyber dodavatele">
              {!loading &&
                data?.getClients?.map((client: Client) => (
                  <Select.Option key={client._id} value={client.ico}>
                    {client.name}: {client.adress}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item label="Invoice number" name="invoiceNumber">
            <Input />
          </Form.Item>

          <Form.Item label="Supplier Ref. No." name="supplierReferenceNumber">
            <InputNumber fullWidth />
          </Form.Item>

          <Form.Item label="Datum prijeti" name="acceptanceDate">
            <Date fullWidth />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>Datum zdanitelneho plneni DUZP</span>
            }
            name="duzp"
          >
            <Date fullWidth />
          </Form.Item>

          <Form.Item label="Datum splatnosti" name="dueDate">
            <Date fullWidth />
          </Form.Item>

          <Form.Item label="Popis" name="description">
            <TextArea />
          </Form.Item>

          <Form.Item label="Mnozstvi" name="quantity">
            <InputNumber fullWidth />
          </Form.Item>

          <Form.Item label="Cena bez DPH" name="priceWithoutTax">
            <InputNumber fullWidth />
          </Form.Item>

          <Form.Item label="DPH" name="tax">
            <Select>
              <Select.Option value="0">0%</Select.Option>
              <Select.Option value="15">15%</Select.Option>
              <Select.Option value="21">21%</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Kod DPH" name="taxCode">
            <Select>
              <Select.Option value="one">Prijeti sluzby z tuzemska - zakladni</Select.Option>
              <Select.Option value="two">Prijeti sluzby ze zahranici - zakladni</Select.Option>
              <Select.Option value="three">Prijeti sluzby z tuzemska - snizena</Select.Option>
              <Select.Option value="four">Prijeti sluzby ze zahranici - snizena</Select.Option>
              <Select.Option value="five">Prijeti zbozi z tuzemska - zakladni</Select.Option>
              <Select.Option value="six">Prijeti zbozi ze zahranici - zakladni</Select.Option>
              <Select.Option value="seven">Prijeti zbozi z tuzemska - snizena</Select.Option>
              <Select.Option value="eight">Prijeti zbozi ze zahranici - snizena</Select.Option>
              <Select.Option value="nine">Nezahrnovat</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Operace" name="operation">
            <InputNumber fullWidth />
          </Form.Item>

          <Form.Item label="Cena celkem" name="totalPrice">
            <InputNumber fullWidth />
          </Form.Item>

          <Button htmlType="submit" type="primary">
            Odeslat
          </Button>
        </Form>
      </Card>

      <button type="button" onClick={() => localStorage.removeItem('token')}>
        LOGOUT
      </button>
    </>
  );
};
