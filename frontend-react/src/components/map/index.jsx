import React from 'react';
import ReactDOM from 'react-dom';
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
		this.state = { value: 0, lat: 0, lon: 0, icons: [] };

		setInterval(async () => {
			const responce = await axios(`${API_URL}/api/l3/realtime/lightbuffer`).catch(err => {
				console.log(err)
			})
			const icons = responce.data.data.map((value) => <TrafficLightMarker key={value._id} lat={value.lat} lon={value.lon} color={value.status} />)
			this.setState({ icons })
			//console.log(this.state.icons)

		//this.setState({ lat: res.data.lat, lon: res.data.lon, value: res.data.status });

		//setInterval(async () => {
			//const responce = await axios.get(`${API_URL}/api/l3/realtime/lightbuffer`).catch((err) => {
				//console.log(err);
			//});
			//console.log(responce.data.data);

			//const icons = responce.data.data.map((value) => (
				//<TrafficLightMarker key={value._id} lat={value.lat} lon={value.lon} color={value.status} />
			//));

			//this.setState({ icons });
			//console.log(this.state.icons);

		}, 10000);
	}

	componentWillUnmount() {
		clearTimeout(this.intervalID);
	}

	componentDidMount = () => {};

	render() {
		return (
			<div>
				<Map center={[ -37.84766, 145.11486 ]} zoom={16} style={{ zIndex: 1 }} id="iconContainer">
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>
					<div>{this.state.icons.map((element) => <React.Fragment>{element}</React.Fragment>)}</div>
				</Map>
			</div>
		);
	}
}

export default ReinFlowMap;
