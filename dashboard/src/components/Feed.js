import React from 'react';
import { Spinner } from 'reactstrap';
import Event from './Event';
import './Feed.scss';

const Feed = props => {

    if (!props.hp_data) {
        return <Spinner color="secondary" />;
    }
    else {
        return(
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
                    <tbody>
                        { props.hp_data.map((data, index) => <Event key={index} id={index} session={data} />) }
                    </tbody>
                </table>
            </div>
        );
    }
};

export default Feed;