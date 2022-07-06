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

    render() {

        const attacks_count = this.props.aggregates.attacks ? this.props.aggregates.attacks : 0;
        const urls_count = this.props.aggregates.urls ? this.props.aggregates.urls : 0;
        const hashes_count = this.props.aggregates.hashes ? this.props.aggregates.hashes: 0;

        return (
            <>
                <h1>Stats (Last 24 Hours)</h1>
                <div className="container">
                    <Statbox type={'Urls'} data={urls_count} view={2} />
                    <Statbox type={'Attacks'} data={attacks_count} view={1} />
                    <Statbox type={'Hashes'} data={hashes_count} view={3} />
                </div>
                <hr/>
            </>
        )
    }
}

export default Stats