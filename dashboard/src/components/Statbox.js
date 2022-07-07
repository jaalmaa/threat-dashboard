import React, { Component } from 'react';
import './Statbox.scss';

class Statbox extends Component {

    render() {
        var view_link = "/dashboard?view=" + this.props.view
        return (
            <div className="statbox">
                <a className="stat_header" href={view_link}>{ this.props.type }</a>
                <p className="stat_number">{ this.props.data }</p>
            </div>
        )
    }

}

export default Statbox;