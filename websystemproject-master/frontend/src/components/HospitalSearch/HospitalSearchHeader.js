import React from 'react';
import '../stylesheet/Header.css';
import { NavLink } from 'react-router-dom';

const MenuItem = ({active, children, to}) => (
    <NavLink to={to} className={"submenu-item"}>
        {children}
    </NavLink>
)

const HospitalSearchHeader = () => {
    return (
        <div>
            <div className="submenu">
                <MenuItem to={'/hospitalsearch/byname'}>이름 검색</MenuItem>
                <MenuItem to={'/hospitalsearch/byaddress'}>주소 검색</MenuItem>
                <MenuItem to={'/hospitalsearch/byloc'}>현위치 기반 검색</MenuItem>
            </div>
        </div>
    );
};



export default HospitalSearchHeader;
