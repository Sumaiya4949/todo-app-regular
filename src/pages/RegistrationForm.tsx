import { Form, Input, Button, Typography, notification } from "antd";
import axios from "axios";
import { SHA3 } from "sha3";

const { Title } = Typography;

export const RegistrationForm = () => {
  const onFinishFailed = () => {
    notification.error({
      message: `Registration failed`,
      description: "Please try again",
      placement: "top",
    });
  };

  const onFinish = async (values: any) => {
    const hash = new SHA3(512);
    hash.update(values.password);

    try {
      const { data } = await axios.put("/auth/register", {
        email: values.email,
        fullname: values.fullname,
        passwordHash: hash.digest("hex"),
      });

      if (data.success) {
        notification.success({
          message: `Registration successfull`,
          description: "Taking you back to login page",
          placement: "top",
        });
      }
    } catch (error: any) {
      notification.error({
        message: `Registration failed`,
        description: `${error?.response?.data?.message}. Please try again.`,
        placement: "top",
      });
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={4}>Please register yourself to use this app</Title>
      <br />
      <Form.Item
        name={"email"}
        label="Email"
        rules={[
          { type: "email" },
          {
            required: true,
            message: "Please input a valid email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Full Name"
        name="fullname"
        rules={[
          {
            required: true,
            message: "Please input your full name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            validator: (_, value) => {
              if (value?.length >= 8) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("Password must be at least 8 characters.")
              );
            },
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
