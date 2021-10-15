import { useQuery } from '@apollo/client';
import { Button, DatePicker, Form, InputNumber, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useState } from 'react';
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
    axios
      .get('/api/invoices')
      .then(response => {
        setInvoices(response.data);
      })
      .catch(err => {
        // handle error
        console.log(err);
      })
      .then(() => {
        // always executed
      });

    console.log(data?.getClients);
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        layout="horizontal"
        style={{ marginTop: 50 }}
        wrapperCol={{
          span: 14,
        }}
        onFinish={handleOnFinish}
      >
        <Form.Item label="Dodavatel" name="supplier">
          <Select placeholder="vzber dodavatele">
            {!loading &&
              data?.getClients?.map((client: Client) => (
                <Select.Option key={client._id} value={client.ico}>
                  {client.name}: {client.adress}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item label="Datum prijeti" name="acceptanceDate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Datum zdanitelneho plneni DUZP" name="duzp">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Datum splatnosti" name="dueDate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="Popis" name="description">
          <TextArea />
        </Form.Item>

        <Form.Item label="Mnozstvi" name="quantity">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Cena bez DPH" name="priceWithoutTax">
          <InputNumber />
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
          <InputNumber />
        </Form.Item>

        <Form.Item label="Cena celkem" name="totalPrice">
          <InputNumber />
        </Form.Item>

        <Form.Item name="Button">
          <Button htmlType="submit" type="primary">
            Odeslat
          </Button>
        </Form.Item>
      </Form>

      <button type="button" onClick={() => localStorage.removeItem('token')}>
        LOGOUT
      </button>
    </>
  );
};
