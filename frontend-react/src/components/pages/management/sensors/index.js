import React, { useState } from 'react';
import Headers from '../../../header';
import { PageHeader, Layout, Breadcrumb, Input, Form, InputNumber, Button, Steps } from 'antd';
import ReinFlowFooter from '../../../footer/footer';
import './sensors.css';
import { add_new_sensor } from '../../../../authentication/management';
import { openNotificationWithIcon } from '../../../notification';

const { Header, Content, Footer, Sider } = Layout;
const { Step } = Steps;
function SensorManagement() {
	const [ sensorData, setsensorData ] = useState({
		Sensor_Name: 'null',
		Sensor_Description: 'null',
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
		const resp = await add_new_sensor(
			values.sensor.name,
			values.sensor.description,
			values.sensor.lat,
			values.sensor.lon
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
				openNotificationWithIcon('success', 'Platform Manager', 'New Sensor Successfully added!');
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
			<Headers />
			<Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh' }}>
				<Header
					className="site-layout-background"
					style={{ padding: 0, position: 'fixed', width: '100%', background: 'black', zIndex: 10 }}
				/>
				<Content style={{ margin: '29px 16px 0', overflow: 'initial' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Management</Breadcrumb.Item>
						<Breadcrumb.Item>Sensors</Breadcrumb.Item>
					</Breadcrumb>
					<PageHeader
						className="site-page-header"
						title="Sensor Management"
						subTitle="You can add a new sensor endpoint to the platform"
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

					<div className="site-layout-background sensor__dash" style={{ padding: 24 }} />
				</Content>
				<ReinFlowFooter />
			</Layout>
		</React.Fragment>
	);
}

export default SensorManagement;
