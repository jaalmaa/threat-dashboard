import React, { Component } from 'react';
import './views.scss';

class Urls extends Component {

    render() {
    
        const timestamp = new Date(Date.parse(this.props.session.startTime)).toLocaleString();
        const urls = this.props.session.url;

        if (urls.length !== 0) {
            return (
                <div className="view-container">
                    <div>{this.props.id + 1}</div>
                    <div>{ urls.length ? timestamp : null}</div>
                    <div>{ urls.length ? urls.map((url, index) => <div className="technical-stat" key={index}>{ url }</div>) : null}</div>
                </div>
            )
        }

        else {
            return(null)
        }
    }

}

export default Urls;