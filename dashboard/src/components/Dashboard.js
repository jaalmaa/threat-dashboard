import React, { Component } from 'react';
import Stats from './Stats';
import Feed from './Feed';
import './Dashboard.scss';

class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard-container">
                <Stats hp_data={this.props.hp_data} aggregates={this.props.aggregates} />
                <Feed hp_data={this.props.hp_data} />
            </div>
        )
    }
}

export default Dashboard;