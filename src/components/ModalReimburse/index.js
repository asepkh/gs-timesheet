import { useEffect, useState } from "react";
import moment from "moment";
import { storage } from "@/configs/firebase";
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import getBase64 from "@/helpers/getBase64";

import Icon from "@/helpers/Icon";
import { Modal, Form, Input, InputNumber, DatePicker, Upload } from "antd";

const ModalReimburse = ({
  visible,
  onCancel,
  title,
  onFinish,
  initialValues,
  isLoading,
  ...otherProps
}) => {
  const [form] = Form.useForm();
  const [removeImages, setRemoveImages] = useState([]);
  const [preview, setPreview] = useState(null);

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const previewImage = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreview(file.url || file.preview);
  };

  const uploadImage = (options) => {
    const { onSuccess, onError, file, onProgress } = options;
    const storageRef = ref(storage, `images/${file.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((100 * snapshot.bytesTransferred) / snapshot.totalBytes);
        onProgress({ percent: progress });
      },
      (error) => {
        // Handle error during the upload
        onError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          file.url = downloadURL;
          onSuccess("Successfully uploaded file.");
        });
      }
    );
  };

  const removeImage = (file) => {
    if (!file.url) return;

    setRemoveImages([...removeImages, file.url]);
  };

  useEffect(() => {
    if (initialValues)
      form.setFieldsValue({
        ...initialValues,
        date: initialValues.date ? moment(initialValues.date) : undefined,
      });
  }, [initialValues, form]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={title}
      okText={title !== "Update Reimburse" ? "Submit" : "Save"}
      okButtonProps={{
        disabled: isLoading,
      }}
      onOk={() => {
        if (isLoading) return;

        form
          .validateFields()
          .then((values) => {
            onFinish(values);

            if (removeImages?.length) {
              removeImages.forEach(async (url) => {
                deleteObject(ref(storage, url));
              });
            }
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      width={600}
    >
      <Form
        {...otherProps}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        form={form}
        onValuesChange={(value) => console.log(value)}
      >
        <Form.Item
          label="Reimburse"
          name="value"
          required
          rules={[{ required: true, message: "Jumlah Reimburse harus diisi" }]}
        >
          <InputNumber
            formatter={(value) => `Rp. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\Rp.\s?|(,*)/g, "")} //eslint-disable-line
            placeholder="E.g. 300.000"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          label="Tanggal"
          name="date"
          required
          rules={[{ required: true, message: "Tanggal harus diisi" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="images"
          label="Bukti Pembayaran"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Bukti Pembayaran harus diisi minimal 1" }]}
        >
          <Upload
            onPreview={previewImage}
            onRemove={removeImage}
            customRequest={uploadImage}
            name="images"
            listType="picture-card"
          >
            <div>
              <Icon type="PlusOutlined" />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Keterangan" name="description" tooltip="Optional">
          <Input.TextArea
            placeholder="E.g. Reimburse Ongkos Perjalanan Dinas"
            style={{ width: "100%" }}
            rows={3}
          />
        </Form.Item>
        {title === "Update Reimburse" ? (
          <Form.Item name="id" style={{ display: "none" }}>
            <Input />
          </Form.Item>
        ) : (
          <></>
        )}
      </Form>
      <Modal
        centered
        visible={!!preview}
        title="Preview Bukti Pembayaran"
        onCancel={() => setPreview(null)}
        footer={null}
      >
        <a href={preview} target="_blank" rel="noreferrer">
          <img alt="Bukti Pembayaran" style={{ width: "100%" }} src={preview} />
        </a>
      </Modal>
    </Modal>
  );
};

export default ModalReimburse;
