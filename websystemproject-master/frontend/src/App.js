import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import RouterApp from "./components/router/index";
// import Logo from "../src/components/Logo"
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";
import Header from "./components/Header";
import Footer from "./components/Footer";


class App extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    render() {
        return (
            <Router>
                {/*<Logo />*/}
                {this.props.cookies.get('user')!==undefined ?  <Header /> : <div></div>}
                <div className={"body"}>
                <RouterApp />
                </div>
                <div className={"footer"}>
                <Footer user ={this.props.cookies.get('user')} />
                </div>
            </Router>
        );
    }

}


export default withCookies(App);
