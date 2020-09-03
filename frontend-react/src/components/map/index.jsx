import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import TrafficLightMarker from './components/traffic-light'
import axios from 'axios'

class ReinFlowMap extends React.Component {
	/**
	 * 	color values for TrafficLightMarker
	 *  0 - Green
	 * 	1 - Yellow
	 *  2 - Red
	 */
	intervalID;

	constructor() {
		super()
		this.state = { value: 0 };
	}

	getLightData = () => {
		this.intervalID = setTimeout(this.getLightData.bind(this), 5000);
	}

	componentWillUnmount() {
		clearTimeout(this.intervalID);
	}

	componentDidMount = () => {
		this.getLightData();
		setTimeout(() => { this.setState({ value: 1 }) }, 5000)
	}

	render() {
		return (
			<Map center={[-37.84766, 145.11486]} zoom={16}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				<TrafficLightMarker lat={-37.84766} lon={145.11486} color={this.state.value} />
			</Map>
		);
	}
}

export default ReinFlowMap;
