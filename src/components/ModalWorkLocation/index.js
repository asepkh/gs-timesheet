import { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const ModalWorkLocation = ({
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
      okText={title !== "Edit Work Location" ? "Submit" : "Save"}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
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
          label="Place Name"
          name="name"
          required
          rules={[
            { required: true, message: "Work Location Name harus diisi" },
          ]}
        >
          <Input
            placeholder="E.g. Kantor Tanah Tinggi"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Description" name="description" tooltip="Optional">
          <Input.TextArea
            placeholder="E.g. Kantor Utama"
            style={{ width: "100%" }}
            rows={3}
          />
        </Form.Item>
        {title === "Edit Work Location" ? (
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

export default ModalWorkLocation;
