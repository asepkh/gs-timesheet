import { Grid, Row, Col, Form, Input, Button } from "antd";

const { useBreakpoint } = Grid;

const Biodata = () => {
  const screens = useBreakpoint();
  console.log(screens);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h2 style={{ fontWeight: 700, textAlign: "center" }}>BIODATA</h2>
      <Row>
        <Col xs={{ span: 24, offset: 1 }} md={{ span: 6 }}>
          Col
        </Col>
        <Col xs={{ span: 24, offset: 1 }} md={{ span: 16 }}>
          <Form
            name="basic"
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
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

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Biodata;
