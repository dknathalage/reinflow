import React, { useState, useEffect } from 'react';
import { add_new_light } from '../../../../../../authentication/management';
import { openNotificationWithIcon } from '../../../../../notification';
import { Layout, Steps, Input, InputNumber, Button, Form, Table } from 'antd';
import { get_registered_sensors } from '../../../../../../authentication/fetcher';
import { CameraOutlined } from '@ant-design/icons';
const { Step } = Steps;
function ManageSensors() {
	const [ sensorData, setsensorData ] = useState([]);
	const [ isLoading, setisLoading ] = useState(true);
	const columns = [
		{
			title: 'Name',
			dataIndex: 'sensor_name',
			key: 'sensor_name',
			render: (text) => <strong>{text}</strong>
		},
		{
			title: 'Description',
			dataIndex: 'sensor_description',
			key: 'sensor_description'
		},
		{
			title: 'Longititude',
			dataIndex: 'lon',
			key: 'lon',
			render: (text) => <strong>{text}</strong>
		},
		{
			title: 'Latitude',
			key: 'lat',
			dataIndex: 'lat',
			render: (text) => <strong>{text}</strong>
		},
		{
			title: 'Action',
			dataIndex: '',
			key: 'x',
			render: () => (
				<Button type="primary" shape="round" icon={<CameraOutlined />} size={'middle'}>
					Manage
				</Button>
			)
		}
	];

	useEffect(() => {
		fetch();
	}, []);

	const fetch = async () => {
		const data = await get_registered_sensors();
		if (data.status === true) {
			const sensorData = await data.sensors;
			setisLoading(false);
			setsensorData(sensorData);
			console.log('DATA', sensorData);
		} else {
			setisLoading(true);
			openNotificationWithIcon('error', 'Platform Manager', 'Something bad happnened!');
		}
	};

	return (
		<React.Fragment>
			<h1>Manage Sensors</h1>
			<Table columns={columns} dataSource={sensorData} loading={isLoading} bordered />
		</React.Fragment>
	);
}

export default ManageSensors;
