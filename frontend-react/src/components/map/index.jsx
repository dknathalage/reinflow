import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import TrafficLightMarker from './components/traffic-light';
import axios from 'axios';
import { API_URL } from '../../authentication/urls';

class ReinFlowMap extends React.Component {
	/**
	 * 	color values for TrafficLightMarker
	 *  0 - Green
	 * 	1 - Yellow
	 *  2 - Red
	 */
	intervalID;

	constructor() {
		super();
		this.state = { value: 0, lat: -37.84766, lon: 145.11486 };
		setInterval(() => {
			axios.get(`${API_URL}/api/realtime/lightbuffer`).then((res) => {
				this.setState({ lat: res.data.lat, lon: res.data.lon, value: res.data.status });
			});
		}, 5000);
	}

	componentWillUnmount() {
		clearTimeout(this.intervalID);
	}

	componentDidMount = () => {};

	render() {
		return (
			<Map center={[ -37.84766, 145.11486 ]} zoom={16} style={{ zIndex: 1 }}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				<TrafficLightMarker lat={this.state.lat} lon={this.state.lon} color={this.state.value} />
			</Map>
		);
	}
}

export default ReinFlowMap;
