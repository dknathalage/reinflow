import React from 'react';
import {
	Layout,
	Menu,
	Breadcrumb,
	PageHeader,
	Card,
	Row,
	Col,
	Statistic,
	Input,
	InputNumber,
	Button,
	Form,
	Collapse
} from 'antd';

import ReinFlowFooter from '../../../footer/footer';
import Headers from '../../../header';
import './userdaash.css';
import { List, Avatar } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Header, Content } = Layout;
const { Panel } = Collapse;

function UserDashboard() {
	const user = useSelector((state) => state.user);
	const data = [
		{
			title: 'User ID',
			description: `${user.user_id}`
		},
		{
			title: 'User Access Level',
			description: `${user.accesslevel}`
		},
		{
			title: 'User Location',
			description: (
				<p>
					IP: {user.location.ip} <br /> City: {user.location.city}
				</p>
			)
		},
		{
			title: 'User Engine',
			description: `${navigator.userAgent}`
		}
	];
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 8 }
	};

	const validateMessages = {
		required: '${label} is required!',
		types: {
			email: '${label} is not validate email!',
			number: '${label} is not a validate number!'
		},
		number: {
			range: '${label} must be between ${min} and ${max}'
		}
	};
	const onFinish = (values) => {
		console.log(values);
	};

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
											title="Active Sensors"
											value={0}
											precision={0}
											valueStyle={{ color: '#3f8600' }}
											prefix={<ArrowUpOutlined />}
										/>
									</Card>
								</Col>
								<Col span={12}>
									<Card>
										<Statistic
											title="Errors Encounted"
											value={0}
											precision={0}
											valueStyle={{ color: '#cf1322' }}
											prefix={<ArrowDownOutlined />}
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
								<Card
									title={
										<h1>
											<strong>USER DETAILS</strong>
										</h1>
									}
									bordered={true}
									hoverable
								>
									<List
										itemLayout="horizontal"
										dataSource={data}
										renderItem={(item) => (
											<List.Item>
												<List.Item.Meta
													avatar={<CaretRightOutlined />}
													title={item.title}
													description={item.description}
												/>
											</List.Item>
										)}
									/>
								</Card>
							</Col>

							<Col span={10}>
								<Card
									title={
										<h1>
											<strong>DATA MANAGEMENT</strong>
										</h1>
									}
									bordered={true}
									hoverable
								>
									<Collapse
										bordered={false}
										defaultActiveKey={[ '1' ]}
										expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
										className="site-collapse-custom-collapse"
									>
										<Panel
											header="Change Your Username"
											key="1"
											className="site-collapse-custom-panel"
										>
											<Form
												{...layout}
												name="nest-messages"
												onFinish={onFinish}
												validateMessages={validateMessages}
											>
												<Form.Item
													name={[ 'user', 'name' ]}
													label="New Name"
													rules={[ { required: true } ]}
												>
													<Input />
												</Form.Item>

												<Form.Item
													name={[ 'user', 'password' ]}
													label="Password"
													rules={[ { required: true } ]}
												>
													<Input type="password" />
												</Form.Item>

												<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
													<Button type="primary" htmlType="submit">
														Submit
													</Button>
												</Form.Item>
											</Form>
										</Panel>
										<Panel
											header="Change Your Email"
											key="2"
											className="site-collapse-custom-panel"
										>
											<Form
												{...layout}
												name="nest-messages"
												onFinish={onFinish}
												validateMessages={validateMessages}
											>
												<Form.Item
													name={[ 'user', 'name' ]}
													label="New Email"
													rules={[ { required: true } ]}
												>
													<Input />
												</Form.Item>

												<Form.Item
													name={[ 'user', 'password' ]}
													label="Password"
													rules={[ { required: true } ]}
												>
													<Input type="password" />
												</Form.Item>

												<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
													<Button type="primary" htmlType="submit">
														Submit
													</Button>
												</Form.Item>
											</Form>
										</Panel>
										<Panel
											header="Change Your Password"
											key="3"
											className="site-collapse-custom-panel"
										>
											<Form
												{...layout}
												name="nest-messages"
												onFinish={onFinish}
												validateMessages={validateMessages}
											>
												<Form.Item
													name={[ 'user', 'name' ]}
													label="New Password"
													rules={[ { required: true } ]}
												>
													<Input type="password" />
												</Form.Item>

												<Form.Item
													name={[ 'user', 'password' ]}
													label="Old Password"
													rules={[ { required: true } ]}
												>
													<Input type="password" />
												</Form.Item>

												<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
													<Button type="primary" htmlType="submit">
														Submit
													</Button>
												</Form.Item>
											</Form>
										</Panel>
									</Collapse>
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
