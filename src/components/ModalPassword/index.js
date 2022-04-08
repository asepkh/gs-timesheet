import { Modal, Form, Input } from "antd";

const ModalPassword = ({ visible, onCancel, onFinish, ...otherProps }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Save"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onFinish(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      title="Ubah Password"
      width={600}
    >
      <Form
        {...otherProps}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        layout="horizontal"
        form={form}
        onValuesChange={(value) => console.log(value)}
      >
        <Form.Item
          name="newPassword"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
          required
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          required
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalPassword;
