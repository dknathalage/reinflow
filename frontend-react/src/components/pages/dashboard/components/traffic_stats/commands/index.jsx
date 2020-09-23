import React, { useState, useEffect } from 'react';
import { get_registered_trafficlights, get_light } from '../../../../../../authentication/fetcher';
import { openNotificationWithIcon } from '../../../../../notification';
import { Table, Button, Modal, Spin, Descriptions, Space } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Map, TileLayer, Marker } from 'react-leaflet';
import Axios from 'axios';
import TrafficLightMarker from '../../../../../map/components/traffic-light';
import { map } from 'leaflet';

function TrafficCommands() {
	const [ lightData, setlightData ] = useState([]);
	const [ isloading, setisloading ] = useState(true);
	const [ visibility, setvisibility ] = useState(false);
	const [ isMapLoading, setisMapLoading ] = useState(true);
	const [ mapData, setmapData ] = useState([]);

	useEffect(() => {
		fetch();
	}, []);

	const fetch = async () => {
		const data = await get_registered_trafficlights();
		if (data.status === true) {
			const lights_data = await data.lights;
			setisloading(false);
			setlightData(await lights_data);
			console.log('LightData', lights_data);
		} else {
			setisloading(true);
			openNotificationWithIcon('error', 'Platform Manager', 'Something bad happened!');
		}
	};

	const handleOnClick = async (e) => {
		e.preventDefault();
		const id = e.target.parentElement.id;
		console.log(id);
		const resp = await get_light(id);
		if (resp.status === true) {
			const data = await resp.light;
			setTimeout(async () => {
				setmapData(await data);
				setisMapLoading(false);
			}, 1000);
			console.log(data);
		} else {
			openNotificationWithIcon('error', 'Platform Manager', 'Something happened!');
		}

		setvisibility(true);
	};

	const handleOk = (e) => {
		setvisibility(false);
	};

	const handleCancel = (e) => {
		setvisibility(false);
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: '_id',
			key: '_id',
			render: (text) => <strong>{text}</strong>
		},
		{
			title: 'Name',
			dataIndex: 'SITE_NO',
			key: '_id'
		},
		{
			title: 'Description',
			dataIndex: 'SITE_NAME',
			key: '_id'
		},
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
		},
		{
			title: 'Action',
			dataIndex: '',
			key: 'x',
			render: (text, record) => (
				<Button
					type="primary"
					shape="round"
					icon={<CameraOutlined />}
					size={'middle'}
					id={record._id}
					onClick={handleOnClick}
				>
					Manage
				</Button>
			)
		}
	];

	const handleTrafficClick = (e) => {
		e.preventDefault();
		const id = e.target.parentElement.id;
		console.log(id);
		switch (id) {
			case '0':
				setmapData({ ...mapData, SIGNAL: 0 });
				console.log('RUNNING', mapData);
				break;
			case '1':
				setmapData({ ...mapData, SIGNAL: 1 });
				break;

			case '2':
				setmapData({ ...mapData, SIGNAL: 2 });
				break;
		}
	};

	return (
		<React.Fragment>
			<h1>Issue Commands - Traffic Control</h1>
			<Table columns={columns} dataSource={lightData} loading={isloading} bordered pagination={{ pageSize: 5 }} />
			<h4>
				Last Selected:{' '}
				<strong>
					{mapData.SITE_NAME}#{mapData._id}
				</strong>
			</h4>
			<Modal
				title="Traffic Control"
				visible={visibility}
				onOk={handleOk}
				onCancel={handleCancel}
				width={1000}
				style={{ textAlign: 'center' }}
			>
				{isMapLoading === false ? (
					<div>
						<Map
							center={[ mapData.lat, mapData.lon ]}
							zoom={16}
							style={{ zIndex: 1, height: 500 }}
							id="iconContainer"
						>
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
							/>
							<TrafficLightMarker key={1} lat={mapData.lat} lon={mapData.lon} color={mapData.SIGNAL} />
						</Map>
						<Descriptions title="Light Info" bordered>
							<Descriptions.Item label="ID">
								<strong>{mapData._id}</strong>
							</Descriptions.Item>
							<Descriptions.Item label="NAME">
								<strong>{mapData.SITE_NAME}</strong>
							</Descriptions.Item>
							<Descriptions.Item label="STATUS">
								{mapData.SIGNAL === 0 ? (
									<Descriptions.Item label="ID">
										<Button
											style={{
												background: 'green',
												borderColor: 'green',
												color: 'black',
												fontWeight: 'bold'
											}}
											block
											disabled
										>
											&emsp;
										</Button>
									</Descriptions.Item>
								) : mapData.SIGNAL === 1 ? (
									<Descriptions.Item label="ID">
										<Button
											style={{
												background: 'orange',
												borderColor: 'orange',
												color: 'black',
												fontWeight: 'bold'
											}}
											block
											disabled
										>
											&emsp;
										</Button>
									</Descriptions.Item>
								) : (
									<Descriptions.Item label="ID">
										<Button
											style={{
												background: 'red',
												borderColor: 'red',
												color: 'black',
												fontWeight: 'bold'
											}}
											block
											disabled
										>
											&emsp;
										</Button>
									</Descriptions.Item>
								)}
							</Descriptions.Item>
						</Descriptions>

						<Space>
							<Button
								type="primary"
								style={{ background: 'orange', borderColor: 'orange', color: 'white' }}
								id={1}
								onClick={handleTrafficClick}
							>
								Switch
							</Button>
							<Button
								type="primary"
								style={{ background: 'green', borderColor: 'green', color: 'white' }}
								id={0}
								onClick={handleTrafficClick}
							>
								Switch
							</Button>
							<Button type="danger" id={2} onClick={handleTrafficClick}>
								Switch
							</Button>
						</Space>
					</div>
				) : (
					<Spin size="large" />
				)}
			</Modal>
		</React.Fragment>
	);
}

export default TrafficCommands;
