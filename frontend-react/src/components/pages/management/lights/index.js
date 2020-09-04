import React, { useState } from 'react';
import Headers from '../../../header';
import { PageHeader, Layout, Breadcrumb, Input, Form, InputNumber, Button, Steps } from 'antd';
import ReinFlowFooter from '../../../footer/footer';
import './lights.css';
import { add_new_light } from '../../../../authentication/lightmanagement';
import { openNotificationWithIcon } from '../../../notification';

const { Header, Content, Footer, Sider } = Layout;
const { Step } = Steps;
function LightManagement() {
	const [ lightData, setlightData ] = useState({
		Light_Name: 'null',
		Light_Description: 'null',
		Location: {
			lon: 'null',
			lat: 'null'
		}
	});
	const [ status, setstatus ] = useState({ id: 0, status: 'waiting' });
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 8 }
	};

	const validateMessages = {
		required: '${label} is required!',
		types: {
			email: '${label} is not validate email!',
			number: '${label} is not a validate number!'
		}
	};

	const onFinish = async (values) => {
		console.log(values);
		setstatus({
			id: 0,
			status: 'finish'
		});
		const resp = await add_new_light(values.light.lot, values.light.lon);
		if (resp.status === true) {
			setstatus({
				id: 1,
				status: 'finish'
			});
			setTimeout(() => {
				setstatus({
					id: 3,
					status: 'finish'
				});
				openNotificationWithIcon('success', 'Platform Manager', 'New Light Successfully added!');
			}, 1000);
		} else {
			setTimeout(() => {
				setstatus({
					id: 1,
					status: 'error'
				});
				openNotificationWithIcon('error', 'Platform Manager', `Something happened! ${resp.error}`);
			}, 1000);
		}
	};

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Headers />
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0 }} />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Management</Breadcrumb.Item>
						<Breadcrumb.Item>Light</Breadcrumb.Item>
					</Breadcrumb>
					<PageHeader
						className="site-page-header"
						title="Light Management"
						subTitle="You can add a new light endpoint to the platform"
					/>
					<div
						style={{
							margin: '50px',
							background: 'white',
							padding: '30px',
							borderRadius: '10px'
						}}
					>
						<Steps current={status.id} status={status.status}>
							<Step title="Submit" description="Youre right here!" />
							<Step title="Sync" description="Sync database and frontend" />
							<Step title="Success" description="Completion" />
						</Steps>
					</div>

					<div className="site-layout-background light__dash" style={{ padding: 24, minHeight: 360 }}>
						<h1>Add a light to the platform</h1>
						<div style={{ display: 'flex' }}>
							<div style={{ flex: '0.5' }}>
								<Form
									{...layout}
									name="nest-messages"
									onFinish={onFinish}
									validateMessages={validateMessages}
								>
									<Form.Item
										name={[ 'light', 'name' ]}
										label="Light Name"
										rules={[ { required: true } ]}
									>
										<Input
											onChange={(e) =>
												setlightData({ ...lightData, Light_Name: `${e.target.value}` })}
										/>
									</Form.Item>
									<Form.Item
										name={[ 'light', 'description' ]}
										label="Light Description"
										rules={[ { required: true } ]}
									>
										<Input
											onChange={(e) =>
												setlightData({
													...lightData,
													Light_Description: `${e.target.value}`
												})}
										/>
									</Form.Item>
									<Form.Item
										name={[ 'light', 'lon' ]}
										label="Longitude"
										rules={[ { type: 'number' } ]}
									>
										<InputNumber
											onChange={(e) =>
												setlightData({
													...lightData,
													Location: {
														lon: `${lightData.Location.lon}`,
														lat: `${e}`
													}
												})}
										/>
									</Form.Item>
									<Form.Item
										name={[ 'light', 'lat' ]}
										label="Latitude"
										rules={[ { type: 'number' } ]}
									>
										<InputNumber
											onChange={(e) =>
												setlightData({
													...lightData,
													Location: {
														lon: `${e}`,
														lat: `${lightData.Location.lat}`
													}
												})}
										/>
									</Form.Item>

									<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
										<Button type="primary" htmlType="submit" style={{ width: '100%' }}>
											Submit
										</Button>
									</Form.Item>
								</Form>
							</div>
							<div style={{ flex: '0.5', background: '#eeeeee', borderRadius: '5px', padding: '20px' }}>
								<pre className="language-bash">{JSON.stringify(lightData, null, 2)}</pre>
							</div>
						</div>
					</div>
				</Content>
				<ReinFlowFooter />
			</Layout>
		</Layout>
	);
}

export default LightManagement;