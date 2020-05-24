import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import Event from './Event';
import './Feed.scss'

class Feed extends Component {
    /* Layout all of the events into a table */

    render() {
        const hp_data = this.props.hp_data;
        const data_feed = hp_data ? hp_data.map((data, index) => <Event key={index} id={index} session={data} />) : <Spinner color="secondary" />;
        return (
            <div className="feed-container">
                <h1 className="feed-title">Feed</h1>
                <table className="feed-table">
                    <thead>
                        <tr>
                            <th className="table-title">#</th>
                            <th className="table-title">Timestamp</th>
                            <th className="table-title">Urls Identified</th>
                            <th className="table-title">File Hashes Identified</th>
                            <th className="table-title">Command History Length</th>
                        </tr>
                    </thead>
                    <hr className="table-line" />
                    <tbody>
                        { data_feed }
                    </tbody>
                </table>
            </div>
        )
    };
};

export default Feed;