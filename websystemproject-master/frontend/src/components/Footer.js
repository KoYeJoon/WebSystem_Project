import React from 'react';
import './stylesheet/Header.css';
import {Link} from "react-router-dom";

const Footer = (props) => {

    console.log(props.user);
    return (
        <div className={"footer"}>
            {props.user!==undefined ?
                <p>©  {new Date().getFullYear()} Copyright: <Link to={"/todo"}>내 건강을 부탁해</Link></p>
                :
                <p>©  {new Date().getFullYear()} Copyright: <Link to={"/"}>내 건강을 부탁해</Link></p>
            }

        </div>
    );

};



export default Footer;
