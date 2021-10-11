import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { Button, Checkbox, Form, Input } from 'antd';
import { useHistory } from 'react-router';
import { LOGIN_USER } from '../../../graphql/queries/User';
import { useSessionContext } from '../../../Router/SessionContext';

interface LoginUserResponse {
  loginUser: {
    token: string;
    user: {
      username: string;
    };
  };
}

export function LoginForm() {
  const history = useHistory();

  const [session, setSession] = useSessionContext();

  const onLoginIn = ({ loginUser }: LoginUserResponse) => {
    sessionStorage.setItem('token', loginUser.token);
    sessionStorage.setItem('user', loginUser.user.username);
    setSession({ ...session, isAuthenticated: true });
    history.push(session.redirectPath);
  };

  const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_USER, {
    onCompleted: onLoginIn,
  });

  const onFinish = (values: any) => {
    loginUser({
      variables: {
        ...values,
      },
    });
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ marginTop: 80 }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>

        {error && error.message}
      </Form>
    </>
  );
}
