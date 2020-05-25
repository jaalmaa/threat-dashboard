import React, { Component } from 'react';
import Statbox from './Statbox';
import './Stats.scss'

class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attacks_count: 0,
            unique_urls: 0,
            unique_hashes: 0
        }
    }

    // getUniqueUrls = () => {
    //     const urls_list = this.props.hp_data ? this.props.hp_data.map(event => event.payload.urls).filter(urls => urls.length) : [];
    //     return urls_list.flat();
    // }

    // getUniqueHashes = () => {
    //     const hashes_list = this.props.hp_data ? this.props.hp_data.map(event => event.payload.hashes).filter(hashes => hashes.length): [];
    //     return hashes_list.flat();
    // }

    render() {
        console.log('aggregates: ' + this.props.aggregates);

        const attacks_count = this.props.aggregates.attacks ? this.props.aggregates.attacks : 0;
        const urls_count = this.props.aggregates.urls ? this.props.aggregates.urls : 0;
        const hashes_count = this.props.aggregates.hashes ? this.props.aggregates.hashes: 0;

        return (
            <>
                <h1>Stats</h1>
                <div className="container">
                    <Statbox type={'Urls'} data={urls_count} />
                    <Statbox type={'Attacks'} data={attacks_count} />
                    <Statbox type={'Hashes'} data={hashes_count} />
                </div>
                <hr/>
            </>
        )
    }
}

export default Stats