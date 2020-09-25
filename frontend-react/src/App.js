import React, { Component, useState } from "react";
import logo from "./assets/REINFLOW.png";
import "./App.css";
import AdminHome from "./components/pages/home";
import Error from "./components/404";
import Dashboard from "./components/pages/dashboard";
import UserLogin from "./components/pages/login";
import UserRegisteration from "./components/pages/register";
import UserDashboard from "./components/pages/sider/user_dashboard";
import SensorManagement from "./components/pages/management/sensors";
import LightManagement from "./components/pages/management/lights";
import AdminDashboard from "./components/pages/dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Spin, notification, Layout, Breadcrumb } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Headers from "./components/header";
import ReinFlowFooter from "./components/footer/footer";
import Management from "./components/pages/management";
import Axios from "axios";
import { config } from "./authentication/urls";
const { Header, Content } = Layout;

Axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `${localStorage.getItem("auth-token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function App() {
  const openNotification = () => {
    notification.open({
      message: "Loading you in",
      description: "Fetching your data!",
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  };

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    const user = useSelector((state) => state.user);
    const [userStatus, setuserStatus] = useState(user.auth_status);
    const [isLoading, setisLoading] = useState(true);

    setTimeout(() => {
      setisLoading(false);
    }, 5000);

    return isLoading === false ? (
      <Route
        {...rest}
        render={(props) => {
          if (userStatus === true) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    ) : (
      <React.Fragment>
        <Headers />
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
            minHeight: "100vh",
          }}
        >
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              position: "fixed",
              width: "100%",
              background: "black",
              zIndex: 10,
            }}
          />
          <Content
            style={{
              margin: "29px 16px 0",
              overflow: "initial",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item> Home </Breadcrumb.Item>{" "}
              <Breadcrumb.Item> Overview </Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                textAlign: "center",
              }}
            >
              <div
                className="site-layout-background"
                style={{
                  padding: 24,
                  height: 360,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spin size="large" />
              </div>
              {openNotification()}
            </div>
          </Content>
          <ReinFlowFooter />
        </Layout>
      </React.Fragment>
    );
  };
  return (
    <Router>
      <div>
        <Switch>
          <ProtectedRoute path="/" exact component={AdminHome} />
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/login" exact component={UserLogin} />
          <Route path="/register" exact component={UserRegisteration} />
          <ProtectedRoute
            path="/user-dashboard"
            exact
            component={UserDashboard}
          />
          <ProtectedRoute path="/management" exact component={Management} />
          <ProtectedRoute
            path="/admin-dashboard"
            exact
            component={AdminDashboard}
          />
          <Route component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
