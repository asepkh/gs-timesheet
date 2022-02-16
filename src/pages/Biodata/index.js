import React from "react";
import { Grid, Row, Col, Form, Input, Button, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

const Biodata = () => {
  const screens = useBreakpoint();
  console.log(screens)

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
        <Col xs={{ span: 24, offset: 1 }} md={{ span: 24 }} lg={{ span: 6 }}>
          <Row>
            <Col xs={{span: 12}} md={{ span: 12 }} lg={{ span: 24 }}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Col>
            
            <Col xs={{span: 12}} md={{ span: 12 }} lg={{ span: 24 }}>
              <div style={{fontSize: 10}}>
                <p>Besar file maksimal 2 MB</p>
                <p>Ekstensi file: jpeg/jpg, png</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 24, offset: 1 }} md={{ span: 24 }} lg={{ span: 16 }}>
          <Form
            name="basic"
            labelCol={{span: 5}}
            wrapperCol={{lg: {span: 24, offset: 1}, md: {span: 16, offset: 1}, sm: {span: 16, offset: 1}}}
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
