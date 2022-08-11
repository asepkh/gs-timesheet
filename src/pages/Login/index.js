import { Form, Input, Button, Checkbox, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";

import { login } from "@/services/user";
import { userStore } from "@/store";

import "./style.css";

const Login = () => {
  const [form] = Form.useForm(),
    [user, setUser] = userStore.use();

  const mutation = useMutation(
    (values) => {
      return login(values);
    },
    {
      onSuccess: ({ data }) => {
        message.success("Login Success");
        setTimeout(() => {
          setUser({ ...user, isLogin: true, ...data.user });
          localStorage.setItem("token", data?.token);
        }, 1000);
      },
      onError: (error) => {
        message.error({
          content: error?.response?.data?.errorMessage || "Login failed",
          duration: 1,
          key: "errorLogin",
        });
        console.log(error?.response?.data?.errorMessage || "Login failed");
      },
    }
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "5rem" }}>
      <Card title="Login Gudang Solusi Timesheet" bordered={false} style={{ width: 500 }}>
        <Form
          form={form}
          name="login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={mutation.mutate}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isLoading}
              disabled={mutation.isLoading}
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
