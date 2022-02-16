import React from "react";
import { Grid, Row, Col, Form, Input, Button, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

const Biodata = () => {
  const screens = useBreakpoint();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { loading, imageUrl } = React.useState('');
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Foto Profil</div>
    </div>
  );

  return (
    <div>
      <Row>
        <Col xs={{ span: 24, offset: 1 }} md={{ span: 6 }}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Col>
        <Col xs={{ span: 24, offset: 1 }} md={{ span: 16 }}>
          <Form
            name="basic"
            labelCol={{lg: {span: 5}, md: {span: 7}, sm: {span: 5}}}
            wrapperCol={{lg: {span: 24, offset: 1}, md: {span: 24, offset: 1}, sm: {span: 16, offset: 1}}}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Nama"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{lg: {span: 24, offset: 6}, 
              md: {span: 24, offset: 8},
              sm: {span: 24, offset: 6}
              }}>
              <Button type="primary" htmlType="submit">
                Simpan
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Biodata;
