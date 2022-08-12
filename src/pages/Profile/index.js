import { useState } from "react";
import { useMutation } from "react-query";
import { Button, Card, Row, Col, Form, Input, Radio, message } from "antd";
import { userStore } from "@/store";
import ModalPassword from "@/components/ModalPassword";
import { updateProfile, changePassword as changePasswordApi } from "@/services/user";

const Profile = () => {
  const [user] = userStore.use(),
    [visible, setVisible] = useState(false),
    [form] = Form.useForm();

  const update = useMutation(
    (values) => {
      return updateProfile(values);
    },
    {
      onSuccess: () => {
        message.success({
          content: "User Update Successfully",
          key: "userUpdate",
        });
        user?.refetch();
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Update User Failed");
      },
    }
  );

  const changePassword = useMutation(
    (values) => {
      return changePasswordApi(values);
    },
    {
      onSuccess: () => {
        message.success("Password Changed!");
        setVisible(false);
      },
      onError: (error) => {
        message.error(error?.response?.data?.errorMessage || "Password Failed To Change");
      },
    }
  );

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={7}>
        <Card>
          <div className="profile-picture">
            <img src={user?.profilePic} alt="profile" />
          </div>
          <h4 className="name">
            {user?.firstName} {user?.lastName}
          </h4>
          <h4 className="email">{user?.email}</h4>
        </Card>
      </Col>
      <Col xs={24} md={17}>
        <Card
          title={
            <Row justify="space-between">
              <h4 style={{ fontWeight: 600 }}>My Profile</h4>
              <Button type="primary" onClick={() => setVisible(true)}>
                Ubah Password
              </Button>
            </Row>
          }
        >
          <Form
            layout="vertical"
            form={form}
            initialValues={user}
            onFinish={(values) => {
              console.log(values);
              update.mutate(values);
            }}
            onValuesChange={(value) => console.log(value)}
          >
            <Row gutter={[20, 20]}>
              <Col xs={24} md={12}>
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
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="phone" label="Phone Number" tooltip="Optional">
                  <Input placeholder="E.g. 081312345678" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true, message: "First Name harus diisi" }]}
                >
                  <Input placeholder="E.g. John" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: "Last Name harus diisi" }]}
                  required
                >
                  <Input placeholder="E.g. Doe" style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="profilePic" label="Profile Picture" tooltip="Optional">
                  <Input placeholder="E.g. http://www.fileurl.com/image.jpg" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="gender" label="Gender" required>
                  <Radio.Group>
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Form.Item name="id" style={{ display: "none" }}>
                <Input />
              </Form.Item>
            </Row>
            <Row justify="end">
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Row>
          </Form>
        </Card>
      </Col>
      <ModalPassword
        visible={visible}
        onCancel={() => setVisible(false)}
        onFinish={(values) => changePassword.mutate(values)}
      />
    </Row>
  );
};

export default Profile;
