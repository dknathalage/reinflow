import React, { useState, useEffect } from 'react';
import { Layout, Form, Breadcrumb, Input, Checkbox, Button, Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined, HddOutlined } from '@ant-design/icons';

import { login_user } from '../../../authentication/auth';

import ReinFlowFooter from '../../footer/footer';
import Headers from '../../header';
import { openNotificationWithIcon } from '../../notification';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/actions/user';
import { useHistory } from 'react-router-dom';

const { Step } = Steps;
const { Header, Content } = Layout;

function UserLogin() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [ statusUpdate, setstatusUpdate ] = useState([
		{
			register: 'process',
			auth: 'wait',
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

	const onFinish = async (values) => {
		const data = await login_user(values.email, values.password);
		console.log(data);
		if (!data.token) {
			openNotificationWithIcon('warning', 'Invalid Details', 'Please check your email or password');
		} else {
			openNotificationWithIcon('success', 'Success!', 'Logging you in!');
			setstatusUpdate({ register: 'finish', auth: 'process', done: 'wait' });
			setTimeout(() => {
				setstatusUpdate({ register: 'finish', auth: 'finish', done: 'finish' });

				dispatch(
					login({
						auth_status: true,
						username: data.username,
						accessLevel: data.accessLevel,
						user_id: data.id,
						location: data.location
					})
				);
				setTimeout(() => {
					history.push('/');
				}, 500);
			}, 1000);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<React.Fragment>
			<Headers />
			<Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh' }}>
				<Header
					className="site-layout-background"
					style={{ padding: 0, position: 'fixed', width: '100%', background: 'black', zIndex: 10 }}
				/>
				<Content style={{ margin: '29px 16px 0', overflow: 'initial' }}>
					<Breadcrumb style={{ margin: '50px 0' }}>
						<Breadcrumb.Item>Users</Breadcrumb.Item>
						<Breadcrumb.Item>Login</Breadcrumb.Item>
					</Breadcrumb>
					<div
						style={{
							margin: '50px',
							background: 'white',
							padding: '30px',
							borderRadius: '10px'
						}}
					>
						<Steps>
							<Step status={statusUpdate.register} title="Login" icon={<UserOutlined />} />
							<Step status={statusUpdate.auth} title="Authenticate" icon={<SolutionOutlined />} />
							<Step status={statusUpdate.done} title="Done" icon={<SmileOutlined />} />
						</Steps>
					</div>

					<div className="site-layout-background" style={{ padding: 24 }}>
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
									label="Email"
									name="email"
									rules={[
										{ required: true, message: 'Please input your email!' },
										{
											type: 'email',
											message: 'Please enter a valid Email Address'
										}
									]}
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
									<br />
									Or <a href="/register">register now!</a>
								</Form.Item>
							</Form>
						</div>
					</div>
				</Content>
				<ReinFlowFooter />
			</Layout>
		</React.Fragment>
	);
}

export default UserLogin;
