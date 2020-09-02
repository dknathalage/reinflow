import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

function ReinFlowMap() {
	return (
		<Map center={[ -37.84766, 145.11486 ]} zoom={16}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
			/>
		</Map>
	);
}

export default ReinFlowMap;
