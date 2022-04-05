import { useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  /*TimePicker,*/
  Select,
  Input,
  InputNumber,
} from "antd";
import Icon from "@/helpers/Icon";

const { Option } = Select,
  { TextArea } = Input;

const ModalTimesheet = ({
  visible,
  onCancel,
  onFinish,
  companyList,
  data,
  timesheetData,
  initialValues,
  ...otherProps
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form
      {...otherProps}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      form={form}
      onValuesChange={(value) => console.log(value)}
    >
      <Modal
        title="Input Timesheet"
        visible={visible}
        onCancel={onCancel}
        centered
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onFinish(values);
              form.resetFields();
              onCancel();
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form.List name="timesheets" initialValue={[{ workHours: undefined }]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div className="timesheet-row">
                  {parseInt(name) > 0 && (
                    <Icon
                      type="CloseOutlined"
                      className="button-remove"
                      onClick={() => remove(name)}
                    />
                  )}
                  <Form.Item
                    {...restField}
                    name={[name, "workHours"]}
                    label="Jam Kerja"
                    required
                    tooltip="Berapa Lama ??"
                    rules={[
                      { required: true, message: "Jam Kerja harus diisi" },
                    ]}
                  >
                    {/* <TimePicker
                      showNow={false}
                      format="H"
                      style={{ width: "100%" }}
                    /> */}
                    <InputNumber placeholder="E.g: 8" min={0} max={24} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "projectId"]}
                    label="Project Company"
                    required
                    tooltip="Required"
                    rules={[
                      {
                        required: true,
                        message: "Project Company harus diisi",
                      },
                    ]}
                  >
                    <Select placeholder="Pilih Project Company">
                      {companyList.map((item, index) => (
                        <Option value={item?.id || item} key={index}>
                          {item?.name || item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    label="Keterangan"
                    tooltip="Optional"
                  >
                    <TextArea rows={2} placeholder="Keterangan (Opsional)" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "date"]}
                    initialValue={data?.date}
                    style={{ display: "none" }}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "id"]}
                    style={{ display: "none" }}
                  >
                    <InputNumber />
                  </Form.Item>
                </div>
              ))}
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<Icon type="PlusOutlined" />}
              >
                Add Other Project Timesheet
              </Button>
            </>
          )}
        </Form.List>
      </Modal>
    </Form>
  );
};

ModalTimesheet.defaultProps = {
  visible: false,
  onCancel: () => {},
  onFinish: () => {},
  companyList: [],
};
export default ModalTimesheet;
