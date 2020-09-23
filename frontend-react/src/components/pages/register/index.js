import React, { useState, useEffect } from "react";
import { Layout, Form, Breadcrumb, Input, Checkbox, Button, Steps } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
  HddOutlined,
} from "@ant-design/icons";

import { useHistory } from "react-router-dom";

import { openNotificationWithIcon } from "../../notification";
import ReinFlowFooter from "../../footer/footer";
import Headers from "../../header";
import { register_user } from "../../../authentication/auth";

const { Step } = Steps;
const { Header, Content } = Layout;

function UserRegisteration() {
  const history = useHistory();
  const [statusUpdate, setstatusUpdate] = useState([
    {
      register: "process",
      db_sync: "wait",
      done: "wait",
    },
  ]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async (values) => {
    if (values.rego.password === values.rego.pass_confirmation) {
      setstatusUpdate({
        register: "finish",
        db_sync: "process",
        done: "wait",
      });
      const construct = {
        name: values.rego.username,
        email: values.rego.email,
        password: values.rego.password,
      };
      const resp = await register_user(
        construct.name,
        construct.email,
        construct.password
      );

      if (resp.status !== false) {
        openNotificationWithIcon(
          "success",
          "User Registar",
          `Successfully Registered.`
        );
        setTimeout(() => {
          setstatusUpdate({
            register: "finish",
            db_sync: "finish",
            done: "finish",
          });
          setTimeout(() => {
            history.push("/login");
          }, 500);
        }, 1000);
      } else {
        openNotificationWithIcon(
          "error",
          "Error Dispatch",
          "Something happened. Please try again in a bit."
        );
      }
    } else {
      openNotificationWithIcon(
        "warn",
        "Invalid Password",
        "Entered passwords do not match!"
      );
    }

    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    openNotificationWithIcon(
      "error",
      "Invalid Form data",
      "Please recheck the entered details"
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Headers />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Users</Breadcrumb.Item>
            <Breadcrumb.Item>Registeration</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              margin: "50px",
              background: "white",
              padding: "30px",
              borderRadius: "10px",
            }}
          >
            <Steps>
              <Step
                status={statusUpdate.register}
                title="Register"
                icon={<UserOutlined />}
              />
              <Step
                status={statusUpdate.db_sync}
                title="Sync Database"
                icon={<SolutionOutlined />}
              />
              <Step
                status={statusUpdate.done}
                title="Done"
                icon={<SmileOutlined />}
              />
            </Steps>
          </div>

          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <h1 style={{ fontWeight: "bolder" }}>Create an Account!</h1>
            <div style={{ paddingTop: "50px", paddingBottom: "50px" }}>
              <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  label="Username"
                  name={["rego", "username"]}
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name={["rego", "email"]}
                  label="Email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please enter your email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name={["rego", "password"]}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name={["rego", "pass_confirmation"]}
                  rules={[
                    {
                      required: true,
                      message: "Please re-enter your password",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  {...tailLayout}
                  name="remember"
                  valuePropName="checked"
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <br />

                  <p>
                    Already have an account? <a href="/login">login!</a>
                  </p>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Content>
        <ReinFlowFooter />
      </Layout>
    </Layout>
  );
}

export default UserRegisteration;
