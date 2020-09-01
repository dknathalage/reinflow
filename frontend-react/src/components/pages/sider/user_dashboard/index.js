import React from "react";
import { Layout, Menu, Breadcrumb, PageHeader, Card, Row, Col } from "antd";

import ReinFlowFooter from "../../../footer/footer";
import Headers from "../../../header";
import "./userdaash.css";
const { Header, Content } = Layout;

function UserDashboard() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Headers />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <PageHeader
            className="site-page-header"
            title="User Details"
            breadcrumb="TEST"
            subTitle="Manage user account"
          />
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div className="site-card-wrapper">
              <Row gutter={16}>
                <Col span={8}>
                  <Card title="USER" bordered={true} hoverable>
                    User
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Card title" bordered={true} hoverable>
                    Card content
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Card title" bordered={true} hoverable>
                    Card content
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
        </Content>
        <ReinFlowFooter />
      </Layout>
    </Layout>
  );
}

export default UserDashboard;
