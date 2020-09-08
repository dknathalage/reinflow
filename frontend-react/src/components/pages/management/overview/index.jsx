import React, { useState } from 'react';
import { useEffect } from 'react';
import { get_registered_sensors, get_registered_trafficlights } from '../../../../authentication/fetcher';
import { Table } from 'antd';

function Overview() {
	const [ sensorData, setsensorData ] = useState([]);
	const [ lightData, setlightData ] = useState([]);
	const [ isloading, setisloading ] = useState(true);
	useEffect(() => {
		fetch();
		return () => {};
	}, []);

	const fetch = async () => {
		const trafficLights = await get_registered_trafficlights();
		const sensors = await get_registered_sensors();

		if (trafficLights.status === true && sensors.status === true) {
			const lights_data = await trafficLights.lights;
			const sensors_data = await sensors.sensors;
			setisloading(false);
			setlightData(await lights_data);
			setsensorData(await sensors_data);
		} else {
			setisloading(true);
		}
	};

	const Sensorcolumns = [
		{
			title: 'ID',
			dataIndex: '_id',
			key: '_id',
			render: (text) => <strong>{text}</strong>
		},
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
			title: 'Location',
			children: [
				{
					title: 'Latitude',
					key: 'lat',
					dataIndex: 'lat',
					render: (text) => <strong>{text}</strong>
				},
				{
					title: 'Longititude',
					dataIndex: 'lon',
					key: 'lon',
					render: (text) => <strong>{text}</strong>
				}
			]
		}
	];

	const lightColumns = [
		{
			title: 'ID',
			dataIndex: '_id',
			key: '_id',
			render: (text) => <strong>{text}</strong>
		},
		{
			title: 'Name',
			dataIndex: 'light_name',
			key: '_id',
			render: (text) => <strong>{text}</strong>
		},
		{
			title: 'Description',
			dataIndex: 'light_description',
			key: '_id'
		},
		{
			title: 'Location',
			children: [
				{
					title: 'Latitude',
					key: '_id',
					dataIndex: 'lat',
					render: (text) => <strong>{text}</strong>
				},
				{
					title: 'Longititude',
					key: '_id',
					dataIndex: 'lon',
					render: (text) => <strong>{text}</strong>
				}
			]
		}
	];

	return (
		<React.Fragment>
			<h1>Ground Sensors</h1>
			<Table
				columns={Sensorcolumns}
				dataSource={sensorData}
				loading={isloading}
				bordered
				pagination={{ pageSize: 3 }}
				size="small"
			/>
			<h1>Traffic Lights</h1>
			<Table
				columns={lightColumns}
				dataSource={lightData}
				loading={isloading}
				bordered
				pagination={{ pageSize: 3 }}
				size="small"
			/>
		</React.Fragment>
	);
}

export default Overview;
