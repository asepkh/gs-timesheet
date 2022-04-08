import { useEffect } from "react";
import { Modal, Form, Input, Radio } from "antd";

const ModalUser = ({
  visible,
  onCancel,
  title,
  onFinish,
  initialValues,
  ...otherProps
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      title={title}
      centered
      okText={title !== "Edit Karyawan" ? "Submit" : "Save"}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
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
          name="email"
          label="E-mail"
          required
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="E.g. johndoe@gmail.com" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: title !== "Edit Karyawan",
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
              required: title !== "Edit Karyawan",
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (title !== "Edit Karyawan") return Promise.resolve();

                if (!value || getFieldValue("password") === value) {
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
        <Form.Item
          label="First Name"
          name="firstName"
          required
          rules={[{ required: true, message: "First Name harus diisi" }]}
        >
          <Input placeholder="E.g. John" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Last Name harus diisi" }]}
          required
        >
          <Input placeholder="E.g. Doe" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number" tooltip="Optional">
          <Input placeholder="E.g. 081312345678" />
        </Form.Item>
        <Form.Item name="profilePic" label="Profile Picture" tooltip="Optional">
          <Input placeholder="E.g. http://www.fileurl.com/image.jpg" />
        </Form.Item>
        <Form.Item name="role" label="Role" tooltip="Optional">
          <Input placeholder="E.g. Frontend Developer" />
        </Form.Item>
        <Form.Item name="isAdmin" label="Admin Privielege" required>
          <Radio.Group>
            <Radio value={false}>No</Radio>
            <Radio value={true}>Yes</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="gender" label="Gender" required>
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        {title === "Edit Karyawan" ? (
          <Form.Item name="id" style={{ display: "none" }}>
            <Input />
          </Form.Item>
        ) : (
          <></>
        )}
      </Form>
    </Modal>
  );
};

export default ModalUser;
