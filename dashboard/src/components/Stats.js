import React, { Component } from 'react';

class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attacks_count: 0,
            unique_urls: 0,
            unique_hashes: 0
        }
    }

    getUniqueUrls = () => {
        const urls_list = this.props.hp_data ? this.props.hp_data.map(event => event.payload.urls).filter(urls => urls.length) : [];
        return urls_list.flat();
    }

    getUniqueHashes = () => {
        const hashes_list = this.props.hp_data ? this.props.hp_data.map(event => event.payload.hashes).filter(hashes => hashes.length): [];
        return hashes_list.flat();
    }

    render() {

        const attacks_count = this.props.hp_data.length;
        const urls = this.getUniqueUrls();
        const hashes = this.getUniqueHashes();

        return (
            <>
                <h1>Stats</h1>
                <div>
                    <p>Attacks: { attacks_count }</p>
                    <p>Urls: { urls.length }</p>
                    <p>Hashes: { hashes.length }</p>
                </div>
                <hr/>
            </>
        )
    }
}

export default Stats