import React from "react";
import'../stylesheet/service.css';
import "../stylesheet/images.css";
import axios from "axios";
import {Link} from "react-router-dom";
import HospitalResult from "./hospitalResult";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

const API_HOSPITALS2 = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire";
const myKey = "?"+encodeURIComponent('ServiceKey')+'=%2BOSwyW3ekDuCl8jp63XFAvi8J5oe4nWPL7uDQE9odRF8YcTQrNGv5nbEZc0ihfjijG17KNfF28ywMX%2FWeUXjTA%3D%3D';

class HospitalLocResult extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };


    constructor(props) {
        super(props);
        this.state={
            latitude : props.match.params.lat,
            longitude : props.match.params.long,
            loading : true,
            response : [],
            item : [],
        };
    }

    getHospitalData = async() => {
        const WGS84_LON = '&'+encodeURIComponent('WGS84_LON')+'=';
        const queryName = encodeURIComponent(this.props.match.params.long);
        const WGS84_LAT = '&'+encodeURIComponent('WGS84_LAT')+'=';
        const queryName2 = encodeURIComponent(this.props.match.params.lat);
        const queryParam = `${WGS84_LON}${queryName}${WGS84_LAT}${queryName2}`;
        const url = API_HOSPITALS2+myKey+queryParam;
        let res = await axios.get(url);
        this.setState({
            response : res.data,
            item : res.data.response.body.items.item,
        });

    }
    async componentDidMount() {
        if(this.props.cookies.get('user')===undefined){
            alert("로그인 시간이 만료되었습니다. ");
            return document.location.href="/";
        }

        await this.getHospitalData();
        this.setState({
            loading : false}
        )

    }

    render(){
        const {item} = this.state;
        if(this.state.loading===true){
            return(
                <img src={'/images/hospitalSearch/loading.png'} alt={'loading'}/>
            )
        }

        if(item === undefined){
            return(
                <div>
                    <h4 className={"resultForm"}>검색한 지역 위도: {this.state.latitude} 경도 : {this.state.longitude}</h4>
                    <br />
                    <img src={'/images/hospitalSearch/searchResult.png'} className={'searchResult'} alt={'search result'}/>
                    <img src={'/images/hospitalSearch/noSearchResult.png'} className={'noSearchResult'} alt={'no search result'}/>
                    <Link to={"/hospitalsearch/byloc"}>
                        <input type={"image"} src={'/images/hospitalSearch/searchReset.png'} className={'searchReset'} alt={"search"}/>
                        {/*<button className={"searchField"} >검색 초기화</button>*/}
                    </Link>
                </div>
            )
        }
        else{
            return (
                <div>
                    <h4 className={"resultForm"}>검색한 지역 위도: {this.state.latitude} 경도 : {this.state.longitude}</h4>
                    <br />
                    <img src={'/images/hospitalSearch/searchResult.png'} className={'searchResult'} alt={'search result'}/>
                    <HospitalResult item={item}/>
                    <Link to={"/hospitalsearch/byloc"}>
                        <input type={"image"} src={'/images/hospitalSearch/searchReset.png'} className={'searchReset'} alt={"search"}/>
                        {/*<button className={"searchField"} >검색 초기화</button>*/}
                    </Link>
                </div>
            );
        }

    }
}



export default withCookies(HospitalLocResult);