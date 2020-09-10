import React, { useState } from 'react';
import { add_new_light } from '../../../../../../authentication/management';
import { openNotificationWithIcon } from '../../../../../notification';
import '../../lights.css';
import { Layout, Steps, Input, InputNumber, Button, Form } from 'antd';
const { Step } = Steps;
function AddLights() {
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
		const resp = await add_new_light(
			values.light.name,
			values.light.description,
			values.light.lat,
			values.light.lon
		);
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
		<React.Fragment>
			<div
				style={{
					padding: '20px',
					background: '#eeeeee',
					borderRadius: '5px',
					marginBottom: '10px'
				}}
			>
				<Steps current={status.id} status={status.status}>
					<Step title="Submit" description="Youre right here!" />
					<Step title="Sync" description="Sync database and frontend" />
					<Step title="Success" description="Completion" />
				</Steps>
			</div>

			<h1>
				<strong>Add a light to the platform</strong>
			</h1>
			<div style={{ display: 'flex' }}>
				<div style={{ flex: '0.5' }}>
					<Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
						<Form.Item name={[ 'light', 'name' ]} label="Light Name" rules={[ { required: true } ]}>
							<Input onChange={(e) => setlightData({ ...lightData, Light_Name: `${e.target.value}` })} />
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
						<Form.Item name={[ 'light', 'lon' ]} label="Longitude" rules={[ { type: 'number' } ]}>
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
						<Form.Item name={[ 'light', 'lat' ]} label="Latitude" rules={[ { type: 'number' } ]}>
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
		</React.Fragment>
	);
}

export default AddLights;
