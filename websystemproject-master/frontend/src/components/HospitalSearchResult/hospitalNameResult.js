import React from "react";
import'../stylesheet/service.css';
import "../stylesheet/images.css";
import axios from "axios";
import { Link} from 'react-router-dom';
import HospitalResult from "./hospitalResult";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";


const API_HOSPITALS1 = "http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire";
const myKey = "?"+encodeURIComponent('ServiceKey')+'=%2BOSwyW3ekDuCl8jp63XFAvi8J5oe4nWPL7uDQE9odRF8YcTQrNGv5nbEZc0ihfjijG17KNfF28ywMX%2FWeUXjTA%3D%3D';

class HospitalNameResult extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state={
            name : props.match.params.name,
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

        const QN = '&'+encodeURIComponent('QN')+'=';
        const queryName = encodeURIComponent(this.props.match.params.name);
        const queryParam = `${QN}${queryName}`;
        const url = API_HOSPITALS1+myKey+queryParam;

        let res = await axios.get(url);
        this.setState({
            response : res.data,
            item : res.data.response.body.items.item,
            loading : false,
        });

    }


    render(){
        const {item} = this.state;
        //console.log(this.state.loading);
        if(this.state.loading===true){
            return(
                <img src={'/images/hospitalSearch/loading.png'} alt={'loading'}/>
            )
        }

        if(item === undefined){
            return(
                <div>
                    <h2 className={"resultForm"}>검색한 병원 이름 : {this.state.name}</h2>
                    <br />
                    <img src={'/images/hospitalSearch/searchResult.png'} className={'searchResult'} alt={'search result'}/>
                    {/*<h4>검색 결과가 없습니다.</h4>*/}
                    <img src={'/images/hospitalSearch/noSearchResult.png'} className={'noSearchResult'} alt={'no search result'}/>
                    <Link to={"/hospitalsearch/byname"}>
                        <input type={"image"} src={'/images/hospitalSearch/searchReset.png'} className={'search'} alt={"search"}/>
                        {/*<button className={"searchField"} >검색 초기화</button>*/}
                    </Link>
                </div>
            )
        }
        else{
            return (
                <div>
                    <h2 className={"resultForm"}>검색한 병원 이름 : {this.state.name}</h2>
                    <br />
                    <img src={'/images/hospitalSearch/searchResult.png'} className={'searchResult'} alt={'search result'}/>
                    <HospitalResult item={item}/>
                    <Link to={"/hospitalsearch/byname"}>
                        <input type={"image"} src={'/images/hospitalSearch/searchReset.png'} className={'searchReset'} alt={"search"}/>
                        {/*<button className={"searchField"}  >검색 초기화</button>*/}
                    </Link>
                    </div>
                );
            }

    }
}



export default withCookies(HospitalNameResult);

