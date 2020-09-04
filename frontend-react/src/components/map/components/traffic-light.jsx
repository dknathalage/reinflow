import React, { Component } from 'react'
import { Icon } from 'leaflet';
import { Marker } from 'react-leaflet'

const colors = [
    new Icon({ iconUrl: 'signal/green.png', iconSize: [25, 25] }),
    new Icon({ iconUrl: 'signal/yellow.png', iconSize: [25, 25] }),
    new Icon({ iconUrl: 'signal/red.png', iconSize: [25, 25] }),
]

export default class TrafficLightMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currColor: colors[this.props.color] }
    }

    render() {
        return (
            <>
                <Marker position={[this.props.lat, this.props.lon]} icon={colors[this.props.color]}></Marker>
            </>
        )
    }
}
