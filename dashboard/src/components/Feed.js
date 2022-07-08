import React from 'react';
import { Spinner } from 'reactstrap';
import Event from './Event';
import Urls from './Urls'
import Hashes from './Hashes'
import './Feed.scss';

const Feed = props => {

    if (!props.hp_data) {
        return <Spinner color="secondary" />;
    }

    let queryParams = new URLSearchParams(window.location.search);

    if (queryParams.get('view')) {
        
        if (queryParams.get('view') === '1') {
            return(
                <div>
                    <h1 className="feed-title">Event Feed (Most Recent)</h1>
                    <div className="feed-header">
                        <div>#</div>
                        <div>Timestamp</div>
                        <div>Source IP</div>
                        <div>URLs Identified</div>
                        <div>File Hashes Identified</div>
                        <div>Command History Length</div>
                    </div>
                        { props.hp_data.map((data, index) => <Event key={index} id={index} session={data} />) }
                </div>
            );
        }

        else if (queryParams.get('view') === '2') {
            return(
                <div>
                    <h1 className="feed-title">URL Feed</h1>

                    <div className="view-header">
                        <div>#</div>
                        <div>Timestamp</div>
                        <div>URL</div>
                    </div>

                    { props.hp_data.map((data, index) => <Urls key={index} id={index} session={data} />) }
                </div>
            );
        }

        else if (queryParams.get('view') === '3') {
            return(
                <div>
                    <h1 className="feed-title">Hash Feed</h1>

                    <div className="view-header">
                        <div>#</div>
                        <div>Timestamp</div>
                        <div>Hash</div>
                    </div>

                    { props.hp_data.map((data, index) => <Hashes key={index} id={index} session={data} />) }
                </div>
            );
        }

        else {
            window.location.href = "/dashboard";
        }
    }

    else {
        return(
            <div>
                <h1 className="feed-title">Event Feed (Most Recent)</h1>
                <div className="feed-header">
                    <div>#</div>
                    <div>Timestamp</div>
                    <div>Source IP</div>
                    <div>URLs Identified</div>
                    <div>File Hashes Identified</div>
                    <div>Command History Length</div>
                </div>
                    { props.hp_data.map((data, index) => <Event key={index} id={index} session={data} />) }
            </div>
        );
    }
};

export default Feed;