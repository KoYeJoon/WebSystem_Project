import React from "react";
import "./stylesheet/service.css";
import "./stylesheet/images.css";
import {Link} from "react-router-dom";
import Login from "./LoginService/Login";
import { useCookies } from 'react-cookie';

const Home=()=> {
        let [cookies, setCookie] = useCookies(['user']);
        if(cookies.user !==undefined){
        return window.location.href="/todo";
        }
        return(
            <div>
                    <div className={"logo"}>
                            <Link to={'/'}><img src={'/images/mainPageTitle.png'} className={'mainImg'} alt={"Home"}/></Link>
                    </div>
                    <img src={'/images/auth/noLogin.png'} className={'noLogin'} alt={"noLogin"}/>
                    <Login />
            </div>
        );
};

export default Home;

