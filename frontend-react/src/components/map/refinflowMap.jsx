import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import TrafficLightMarker from './components/traffic-light';
import AntPath from 'react-leaflet-ant-path';
import axios from 'axios';
import { CircleMarker, marker } from 'leaflet';
import { min } from 'moment';
import { Button, Descriptions } from 'antd';
import { openNotificationWithIcon } from '../notification';
import MarkerPoint from './components/marker-points';
import { API_URL } from '../../authentication/urls';
function Reinflowmap() {
	const [segments, setsegments] = useState([]);
	const [segmentData, setsegmentData] = useState(null);
	const [markers, setmarkers] = useState([]);

	const [pointA, setpointA] = useState(null);
	const [pointB, setpointB] = useState(null);

	const [selectingPoint, setselectingPoint] = useState(null);

	const [trafficLights, settrafficLights] = useState([]);

	useEffect(() => {
		//fetch();
		get_lights();
		return () => {
			// cleanup
		};
	}, []);

	const get_lights = async () => {
		setInterval(async () => {
			try {
				const resp = await axios.get(`${API_URL}/api/l3/realtime/lightbuffer`);
				const icons = resp.data.data.map((val) => (
					<TrafficLightMarker key={val._id} lat={val.lat} lon={val.lon} color={val.status} />
				));
				settrafficLights(icons);
			} catch (error) {
				openNotificationWithIcon('error', 'Platform Manager', `Something happened ${error.message}`);
			}
		}, 10000);
	};

	const fetch = async (start, end) => {
		console.log('RUNNING FETCH');
		const resp = await axios.get(
			`https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248cac34acbf4f940a98fdfe1e4c0dd7d11&start=${start[1]},${start[0]}&end=${end[1]}, ${end[0]}`
		);
		const data = await resp.data;
		console.log('data', data);
		const features = await data.features[0];
		const coords = await features.geometry.coordinates;
		axios.post('http://localhost:8000/', { data: data })
		console.log('coords', await coords);
		let coordArr = new Array();
		coords.forEach((element) => {
			let tempArr = element;
			console.log(tempArr[1], tempArr[0]);
			coordArr.push([tempArr[1], tempArr[0]]);
		});
		setTimeout(async () => {
			setsegments(coordArr);
			setsegmentData(true);
			console.log('inverted', coordArr);
		}, 3000);
	};

	const handleOnClick = async (e) => {
		if (selectingPoint === 'A') {
			setpointA([e.latlng.lat, e.latlng.lng]);
		} else if (selectingPoint === 'B') {
			setpointB([e.latlng.lat, e.latlng.lng]);
		}
	};

	const handlePointA = async (e) => {
		e.preventDefault();
		setselectingPoint('A');
		openNotificationWithIcon('warning', 'Platform Manager', 'Now selecting a starting point!');
	};

	const handlePointB = async (e) => {
		e.preventDefault();
		setselectingPoint('B');
		openNotificationWithIcon('warning', 'Platform Manager', 'Now selecting an ending point!');
	};

	const findRoute = async (e) => {
		e.preventDefault();
		if (pointA !== null || pointB !== null) {
			openNotificationWithIcon('success', 'Platform Manager', 'Finding the best possible route for you!');
			fetch(pointA, pointB);
		} else {
			openNotificationWithIcon('error', 'Platform Manager', 'Please select a point first.');
		}
	};

	return (
		<div>
			<Map
				center={[-37.815993, 144.957073]}
				zoom={16}
				style={{ zIndex: 1 }}
				id="iconContainer"
				onclick={handleOnClick}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				<div>{trafficLights.map((element) => <React.Fragment>{element}</React.Fragment>)}</div>
				{pointA !== null ? <MarkerPoint key={5} lat={pointA[0]} lon={pointA[1]} color={0} /> : ''}
				{pointB !== null ? <MarkerPoint key={6} lat={pointB[0]} lon={pointB[1]} color={2} /> : ''}
				{segmentData === true ? <AntPath positions={segments} /> : ''}
			</Map>
			<div>
				<Descriptions bordered title="Control" size="small" extra={<Button type="primary">Edit</Button>}>
					<Descriptions.Item label="Point A">
						<Button type="primary" onClick={handlePointA}>
							Edit
						</Button>
					</Descriptions.Item>
					<Descriptions.Item label="Point B">
						<Button type="primary" onClick={handlePointB}>
							Edit
						</Button>
					</Descriptions.Item>
					<Descriptions.Item label="Find Route">
						<Button type="danger" onClick={findRoute}>
							Find!
						</Button>
					</Descriptions.Item>
				</Descriptions>
			</div>
		</div>
	);
}

export default Reinflowmap;
