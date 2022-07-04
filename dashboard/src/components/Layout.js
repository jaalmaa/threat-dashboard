import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import socketIOClient from 'socket.io-client';
import Dashboard from './Dashboard';
import About from './About';
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
            console.log(data);
            if(data) {
                this.setState({ hpfeed: data.sort((a, b) => { return new Date(b.startTime).getTime() - new Date(a.startTime).getTime() })});
            }
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
                        <NavbarBrand href="/dashboard"><b>Threat Dashboard</b></NavbarBrand>
                        <NavbarBrand href="/about"><b>About</b></NavbarBrand>
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
                    <Route exact path={['/', '/about']}>
                        <About />
                    </Route>
                    <Route exact path='/dashboard'>
                        <Dashboard hp_data={this.state.hpfeed} aggregates={this.state.aggregates} />
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