import React, { useState } from 'react';
import '../../lights.css';
import { Steps, Table, Button } from 'antd';
import { useEffect } from 'react';
import { get_registered_trafficlights } from '../../../../../../authentication/fetcher';
import { CameraOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from '../../../../../notification';
function ManageLights() {
	const [ lightData, setlightData ] = useState([]);
	const [ isloading, setisloading ] = useState(true);

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
			render: () => (
				<Button type="primary" shape="round" icon={<CameraOutlined />} size={'middle'}>
					Manage
				</Button>
			)
		}
	];

	return (
		<React.Fragment>
			<h1>Manage Lights</h1>
			<Table columns={columns} dataSource={lightData} loading={isloading} bordered pagination={{ pageSize: 5 }} />
		</React.Fragment>
	);
}

export default ManageLights;
