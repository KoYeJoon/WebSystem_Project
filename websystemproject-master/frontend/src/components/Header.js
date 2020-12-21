import React from 'react';
import './stylesheet/Header.css';
import {Link, NavLink} from 'react-router-dom';
import requestAuth from "../lib/requestAuth";
import { useCookies } from 'react-cookie';
import { useHistory } from "react-router-dom";

const MenuItem = ({active, children, to}) => (
    <NavLink to={to} className={"menu-item"}>
        {children}
    </NavLink>
)

const LoginItem = ({active,children,to})=>(
    <NavLink to={to} className={"login-item"}>
        {children}
    </NavLink>
)

const Header = () => {
    let [cookies, setCookie,removeCookie] = useCookies(['user']);
    const history = useHistory();

    const handleLogout=async () => {
        let answer = window.confirm("로그아웃 하시겠습니까? ");
        if(answer===true){
            let res = await requestAuth.doLogout();
            //sessionStorage.removeItem("loginInfo");
            if(res.success==="logout 되었습니다."){
                removeCookie('user');
                console.log(history);
                alert("로그아웃 되었습니다.");
                history.push('/');
                //return document.location.href="/";
            }
            else{
                alert("로그아웃에 실패하였습니다. 다시 시도해주세요. ");
            }
        }

    }

    return (
        <div>
            <div className={"logo"}>
                <Link to={'/todo'}><img src={'/images/mainPageTitle.png'} className={'mainImg'} alt={"Home"}/></Link>
            </div>
            <div className={"loginMenu"}>
                <button className={"login-item"} onClick={handleLogout}>로그아웃</button>
                <LoginItem to={'/myinfo'}>내 정보</LoginItem>
            </div>
            <div className={"menu"}>
                <MenuItem to={'/calendar'}>달력</MenuItem>
                <MenuItem to={'/recordlist'}>진료 내역</MenuItem>
                <MenuItem to={'/hospitalsearch'}>병원 검색</MenuItem>
            </div>
        </div>
    );

};



export default Header;
