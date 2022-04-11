import { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const ModalProject = ({
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
  }, [initialValues, form]);

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      title={title}
      okText={title !== "Edit Project" ? "Submit" : "Save"}
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
          label="Project Name"
          name="name"
          required
          rules={[{ required: true, message: "Project Name harus diisi" }]}
        >
          <Input placeholder="E.g. Tokopedia" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Description" name="description" tooltip="Optional">
          <Input.TextArea
            placeholder="E.g. Project E-commerce Tokopedia"
            style={{ width: "100%" }}
            rows={3}
          />
        </Form.Item>
        {title === "Edit Project" ? (
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

export default ModalProject;
