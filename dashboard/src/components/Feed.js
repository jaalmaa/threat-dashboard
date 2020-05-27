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
            <div>
            <h1 className="feed-title">Event Feed</h1>
            <div className="feed-headings">
                <div>#</div>
                <div>Timestamp</div>
                <div>Urls Identified</div>
                <div>File Hashes Identified</div>
                <div>Command History Length</div>
            </div>
                { props.hp_data.map((data, index) => <Event key={index} id={index} session={data} />) }
            </div>
        );
    }
};

export default Feed;