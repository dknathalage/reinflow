import React from 'react';
import { Layout, Menu, Breadcrumb, PageHeader, Card, Row, Col, Statistic } from 'antd';

import ReinFlowFooter from '../../../footer/footer';
import Headers from '../../../header';
import './userdaash.css';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;

function UserDashboard() {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Headers />
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0 }} />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
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
						className="site-layout-background main-wrapper"
						style={{
							padding: 24,
							minHeight: 500,
							borderRadius: '9px',
							background: '#eeeeee'
						}}
					>
						<div
							className="site-statistic-demo-card"
							style={{ background: '#eeeeee', padding: '15px', borderRadius: '3px' }}
						>
							<Row gutter={16}>
								<Col span={12}>
									<Card>
										<Statistic
											title="Active"
											value={11.28}
											precision={2}
											valueStyle={{ color: '#3f8600' }}
											prefix={<ArrowUpOutlined />}
											suffix="%"
										/>
									</Card>
								</Col>
								<Col span={12}>
									<Card>
										<Statistic
											title="Idle"
											value={9.3}
											precision={2}
											valueStyle={{ color: '#cf1322' }}
											prefix={<ArrowDownOutlined />}
											suffix="%"
										/>
									</Card>
								</Col>
							</Row>
						</div>
						<div
							className="site-card-wrapper"
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								margin: '20px'
							}}
						>
							<Col span={10}>
								<Card title="USER" bordered={true} hoverable>
									User
								</Card>
							</Col>

							<Col span={10}>
								<Card title="Card title" bordered={true} hoverable>
									Card content
								</Card>
							</Col>
						</div>
					</div>
				</Content>
				<ReinFlowFooter />
			</Layout>
		</Layout>
	);
}

export default UserDashboard;
