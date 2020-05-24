import React, { Component } from 'react';
import './Statbox.scss';

class Statbox extends Component {

    render() {
        return (
            <div className="statbox">
                <p className="stat_header">{ this.props.type }</p>
                <p className="stat_number">{ this.props.data }</p>
            </div>
        )
    }

}

export default Statbox;