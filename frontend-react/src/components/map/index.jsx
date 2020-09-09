import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import TrafficLightMarker from './components/traffic-light';
import axios from 'axios';
import { API_URL, config } from '../../authentication/urls';

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
		this.state = { value: 0, lat: 0, lon: 0 };
		setInterval(() => {
			let head = config;
			axios.get(`${API_URL}/api/l3/realtime/lightbuffer`, head).then((res) => {
				this.setState({ lat: res.data.lat, lon: res.data.lon, value: res.data.status });
			});
		}, 5000);
	}

	componentWillUnmount() {
		clearTimeout(this.intervalID);
	}

	componentDidMount = () => { };

	render() {
		return (
			<Map center={[-37.84766, 145.11486]} zoom={16} style={{ zIndex: 1 }}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				<TrafficLightMarker lat={-37.849606} lon={145.10962} color={this.state.value} />
				<TrafficLightMarker lat={-37.850497} lon={145.119948} color={this.state.value} />
				<TrafficLightMarker lat={-37.849404} lon={145.109226} color={this.state.value} />
				<TrafficLightMarker lat={-37.850727} lon={145.120026} color={this.state.value} />
				<TrafficLightMarker lat={-37.850258} lon={145.103506} color={this.state.value} />

				<TrafficLightMarker lat={-37.851867} lon={145.132261} color={this.state.value} />
				<TrafficLightMarker lat={-37.852141} lon={145.13253} color={this.state.value} />
				<TrafficLightMarker lat={-37.852216} lon={145.132272} color={this.state.value} />
				<TrafficLightMarker lat={-37.851824} lon={145.132457} color={this.state.value} />

				<TrafficLightMarker lat={-37.850442} lon={145.103227} color={this.state.value} />
			</Map>
		);
	}
}

export default ReinFlowMap;
