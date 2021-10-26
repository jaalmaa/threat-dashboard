import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import socketIOClient from 'socket.io-client';
import Dashboard from './Dashboard';
import Feed from './Feed';
import './Layout.scss'

class Layout extends Component {

    constructor() {
        super();
        this.state = {
            hpfeed: false,
            aggregates: false,
            endpoint: process.env.REACT_APP_API_URI
        };
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("hpfeed", data => {
            this.setState({ hpfeed: data });
        });
        socket.on("aggregates", data => {
            this.setState({ aggregates: data });
        })
    }

    render() {
        return (
            <Router>
                <div className="navbar">
                    <Navbar className="navbar" light expand="md">
                        <NavbarBrand href="/"><b>Threat Dashboard</b></NavbarBrand>
                        <Nav className="nav">
                            {/* <NavItem>
                                <Link className="navlink" to="/">Dashboard</Link>
                            </NavItem>
                            {/* <NavItem>
                                <Link className="navlink" to="/feed">Feed</Link>
                            </NavItem> */}
                        </Nav>
                    </Navbar>
                    <hr />
                </div>
                <Switch>
                    <Route exact path='/'>
                        <Dashboard hp_data={this.state.hpfeed} aggregates={this.state.aggregates} />
                        <Feed hp_data={this.state.hpfeed} />
                    </Route>
                    {/* <Route path="/feed">
                        <Feed hp_data={this.state.hpfeed} />
                    </Route> */}
                </Switch>
            </Router>
        )
    }

}

export default Layout;