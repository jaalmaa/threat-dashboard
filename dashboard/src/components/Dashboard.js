import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Feed from './Feed';
import Stats from './Stats';

class Dashboard extends Component {

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
        console.log('state: ', this.state);
    }

    render() {
        return (
            <>
                <Stats hp_data={this.state.response} />
                <Feed hp_data={this.state.response} />
            </>
        )
    }
}

export default Dashboard;