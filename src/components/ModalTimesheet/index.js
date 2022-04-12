import { useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  /*TimePicker,*/
  Select,
  Input,
  InputNumber,
  Popconfirm,
} from "antd";
import Icon from "@/helpers/Icon";

const { Option } = Select,
  { TextArea } = Input;

const ModalTimesheet = ({
  visible,
  onCancel,
  onFinish,
  companyList,
  workLocationList,
  data,
  timesheetData,
  initialValues,
  onRemove,
  ...otherProps
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) form.setFieldsValue(initialValues);
  }, [initialValues, form]);

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
        okText="Save"
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
        <Form.List name="timesheets" initialValue={[{ workHours: undefined }]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div className="timesheet-row" key={index}>
                  {((parseInt(name) > 0 ||
                    form.getFieldValue(["timesheets", name, "id"])) && (
                    <Popconfirm
                      title="Are you sure？"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={async () => {
                        const id = form.getFieldValue([
                          "timesheets",
                          name,
                          "id",
                        ]);
                        if (id) await onRemove(id);

                        remove(name);
                      }}
                    >
                      <Icon type="CloseOutlined" className="button-remove" />
                    </Popconfirm>
                  )) || <></>}
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
                    <InputNumber placeholder="E.g: 8" min={0} max={24} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "projectId"]}
                    label="Project Name"
                    tooltip="Kosongkan jika izin / cuti / sakit"
                  >
                    <Select placeholder="Pilih Project Name">
                      {companyList.map((item, index) => (
                        <Option value={item?.id || item} key={index}>
                          {item?.name || item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "workLocationId"]}
                    label="Work Location"
                    tooltip="Kosongkan jika izin / cuti / sakit"
                  >
                    <Select placeholder="Pilih Work Location">
                      {workLocationList.map((item, index) => (
                        <Option value={item?.id || item} key={index}>
                          {item?.name || item}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "izin"]}
                    label="Keterangan"
                  >
                    <Select>
                      <Option value="hadir">Hadir</Option>
                      <Option value="izin">Izin</Option>
                      <Option value="cuti">Cuti</Option>
                      <Option value="sakit">Sakit</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label=" "
                    {...restField}
                    name={[name, "description"]}
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
  workLocationList: [],
};
export default ModalTimesheet;
