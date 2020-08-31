import React, { useState, useEffect } from 'react';
import { Layout, Form, Breadcrumb, Input, Checkbox, Button, Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined, HddOutlined } from '@ant-design/icons';

import { openNotificationWithIcon } from '../../notification';
import ReinFlowFooter from '../../footer/footer';
import Headers from '../../header';

const { Step } = Steps;
const { Header, Content } = Layout;

function UserRegisteration() {
	const [ statusUpdate, setstatusUpdate ] = useState([
		{
			register: 'process',
			db_sync: 'wait',
			login: 'wait',
			done: 'wait'
		}
	]);

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 8 }
	};
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 }
	};

	const onFinish = (values) => {
		/**
         * this is a test case of steps. This should be updated once backend apis are implemented.
         */
		setTimeout(() => {
			setstatusUpdate({ ...statusUpdate, register: 'finish' });
			setTimeout(() => {
				setstatusUpdate({ ...statusUpdate, register: 'finish', db_sync: 'progress' });
				setTimeout(() => {
					setstatusUpdate({ ...statusUpdate, register: 'finish', db_sync: 'finish', login: 'progress' });
					setTimeout(() => {
						setstatusUpdate({
							...statusUpdate,
							register: 'finish',
							db_sync: 'finish',
							login: 'finish',
							done: 'progress'
						});
					}, 500);
				}, 500);
			}, 500);
		}, 500);
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		openNotificationWithIcon('error', 'Invalid Form data', 'Please recheck the entered details');
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Headers />
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0 }} />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Users</Breadcrumb.Item>
						<Breadcrumb.Item>Registeration</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ margin: '50px', background: 'white', padding: '30px', borderRadius: '10px' }}>
						<Steps>
							<Step status={statusUpdate.register} title="Register" icon={<UserOutlined />} />
							<Step status={statusUpdate.db_sync} title="Sync Database" icon={<SolutionOutlined />} />
							<Step status={statusUpdate.login} title="Login" icon={<HddOutlined />} />
							<Step status={statusUpdate.done} title="Done" icon={<SmileOutlined />} />
						</Steps>
					</div>

					<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
						<h1 style={{ fontWeight: 'bolder' }}>Create an Account!</h1>
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
									name={[ 'rego', 'username' ]}
									rules={[ { required: true, message: 'Please input your username!' } ]}
								>
									<Input
										onClick={(e) => {
											e.preventDefault();
										}}
									/>
								</Form.Item>

								<Form.Item
									name={[ 'rego', 'email' ]}
									label="Email"
									rules={[ { type: 'email', required: true, message: 'Please enter your email' } ]}
								>
									<Input />
								</Form.Item>

								<Form.Item
									label="Password"
									name={[ 'rego', 'password' ]}
									rules={[ { required: true, message: 'Please input your password!' } ]}
								>
									<Input.Password />
								</Form.Item>

								<Form.Item
									label="Confirm Password"
									name={[ 'rego', 'pass_confirmation' ]}
									rules={[ { required: true, message: 'Please re-enter your password' } ]}
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
