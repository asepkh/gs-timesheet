import React from "react";
import { Form, Input, Button, Checkbox, Card } from 'antd';

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', paddingTop: '5rem'}}>
      <Card title="Login TimeSheet Gudang Solusi" bordered={false} style={{ width: 500 }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
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

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
