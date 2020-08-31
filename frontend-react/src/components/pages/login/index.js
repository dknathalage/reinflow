import React from 'react';
import { Layout, Form, Breadcrumb, Input, Checkbox, Button } from 'antd';

import ReinFlowFooter from '../../footer/footer';
import Headers from '../../header';

const { Header, Content } = Layout;

function UserLogin() {
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 8 }
	};
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 }
	};

	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Headers />
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0 }} />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Users</Breadcrumb.Item>
						<Breadcrumb.Item>Login</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
						<h1 style={{ fontWeight: 'bolder' }}>User Login</h1>
						<div style={{ paddingTop: '50px', paddingBottom: '50px' }}>
							<Form
								{...layout}
								name="basic"
								initialValues={{ remember: true }}
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
							>
								<Form.Item
									label="Username"
									name="username"
									rules={[ { required: true, message: 'Please input your username!' } ]}
								>
									<Input />
								</Form.Item>

								<Form.Item
									label="Password"
									name="password"
									rules={[ { required: true, message: 'Please input your password!' } ]}
								>
									<Input.Password />
								</Form.Item>

								<Form.Item {...tailLayout} name="remember" valuePropName="checked">
									<Checkbox>Remember me</Checkbox>
								</Form.Item>

								<Form.Item {...tailLayout}>
									<Button type="primary" htmlType="submit">
										Submit
									</Button>
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

export default UserLogin;
