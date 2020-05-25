import React, { Component } from 'react';
import Stats from './Stats';
import './Dashboard.scss'

class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard-container">
                <Stats hp_data={this.props.hp_data} aggregates={this.props.aggregates} />
            </div>
        )
    }
}

export default Dashboard;