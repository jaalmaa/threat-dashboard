import React, { Component } from 'react';
import './views.scss';

class Hashes extends Component {

    render() {
    
        const timestamp = new Date(Date.parse(this.props.session.startTime)).toLocaleString();
        const hashes = this.props.session.shasum;

        if (hashes.length !== 0) {
            return (
                <div className="view-container">
                    <div>{ hashes.length ? timestamp : null}</div>
                    <div>{ hashes.length ? hashes.map((hash, index) => <div className="technical-stat" key={index}>{ hash }</div>) : null}</div>
                </div>
            )
        }

        else {
            return(null)
        }
    }

}

export default Hashes;