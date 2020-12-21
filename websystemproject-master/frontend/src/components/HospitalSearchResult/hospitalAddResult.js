import React from "react";
import'../stylesheet/service.css';
import "../stylesheet/images.css";
import axios from "axios";
import {Link} from "react-router-dom";
import HospitalResult from "./hospitalResult";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

const API_HOSPITALS = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire";
const myKey = "?"+encodeURIComponent('ServiceKey')+'=%2BOSwyW3ekDuCl8jp63XFAvi8J5oe4nWPL7uDQE9odRF8YcTQrNGv5nbEZc0ihfjijG17KNfF28ywMX%2FWeUXjTA%3D%3D';

class HospitalAddResult extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        //console.log(props.match.params);
        this.state={
            cityName1 : props.match.params.name1,
            cityName2 : props.match.params.name2,
            loading : true,
            response : [],
            item : [],
        };
    }

    async componentDidMount() {
        if(this.props.cookies.get('user')===undefined){
            alert("로그인 시간이 만료되었습니다. ");
            return document.location.href="/";
        }

        const Q0 = '&'+encodeURIComponent('Q0')+'=';
        const queryName1 = encodeURIComponent(this.props.match.params.name1);
        const Q1 = '&'+encodeURIComponent('Q1')+'=';
        const queryName2 = encodeURIComponent(this.props.match.params.name2);
        const queryParam=`${Q0}${queryName1}${Q1}${queryName2}`;
        const url = API_HOSPITALS+myKey+queryParam;

        let res = await axios.get(url);
        this.setState({
            response : res.data,
            item : res.data.response.body.items.item,
            loading : false
        });

    }

    render(){
        const {item} = this.state;
        // console.log(this.state.loading);
        if(this.state.loading===true){
            return(
               <img src={'/images/hospitalSearch/loading.png'} alt={'loading'}/>
            )
        }

        if(item === undefined){
            return(
                <div>
                    <h2 className={"resultForm"}>검색한 지역 이름 : {this.state.cityName1} {this.state.cityName2}</h2>
                    <br />
                    <img src={'/images/hospitalSearch/searchResult.png'} className={'searchResult'} alt={'search result'}/>
                    {/*<h4>검색 결과가 없습니다.</h4>*/}
                    <img src={'/images/hospitalSearch/noSearchResult.png'} className={'noSearchResult'} alt={'no search result'}/>
                    <Link to={"/hospitalsearch/byaddress"}>
                        <input type={"image"} src={'/images/hospitalSearch/searchReset.png'} className={'searchReset'} alt={"search"}/>
                        {/*<button className={"searchField"} >검색 초기화</button>*/}
                    </Link>
                </div>
            )
        }
        else{
            return (
                <div>
                    <h2 className={"resultForm"}>검색한 지역 이름 : {this.state.cityName1} {this.state.cityName2}</h2>
                    <br />
                    <img src={'/images/hospitalSearch/searchResult.png'} className={'searchResult'} alt={'search result'}/>
                    <HospitalResult item={item}/>
                    <Link to={"/hospitalsearch/byaddress"}>
                        <input type={"image"} src={'/images/hospitalSearch/searchReset.png'} className={'searchReset'} alt={"search"}/>
                        {/*<button className={"searchField"}  >검색 초기화</button>*/}
                    </Link>
                </div>
            );
        }

    }
}
export default withCookies(HospitalAddResult);
