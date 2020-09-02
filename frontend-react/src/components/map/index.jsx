import React from 'react';
import ReactDOM from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';

export default class ReinFlowMap extends React.Component {
    render() {
        return <>
            <Map center={[-37.84766,145.11486]} zoom={16}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />


            </Map>
        </>
    }
}