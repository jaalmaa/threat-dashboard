/* This is the parent feed component for collecting data from the socket.io API and displaying events */
import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import Event from './Event';

class Feed extends Component {

    render() {
        const hp_data = this.props.hp_data;
        // debug: remove this
        console.log(hp_data);
        const data_feed = hp_data ? hp_data.map(data => <Event key={data._id} session={data} />) : <Spinner color="secondary" />;
        return (
            <>
                <h1>Feed</h1>
                <div>
                    { data_feed }
                </div>
            </>
        )
    }
}

export default Feed;