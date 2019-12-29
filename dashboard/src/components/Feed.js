/* This is the parent feed component for collecting data from the socket.io API and displaying events */
import React, { Component } from 'react';
// import Config from '../config.json';
import socketIOClient from 'socket.io-client';
import Event from './Event';

class Feed extends Component {
    
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: 'http://127.0.0.1:3001'
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("hpfeed", data => {
            this.setState({ response: data });
        });
    }

    render() {
        const { response } = this.state;
        console.log(response);
        const data = response ? response.map(res => <Event key={res._id} session={res} />) : <p>Loading...</p>;
        return (
            <>
                <h1>Feed</h1>
                <div>
                    {data}
                </div>
            </>
        )
    }
}

export default Feed;