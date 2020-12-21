import React from 'react';
import "../stylesheet/service.css";
import Map from "./Map";
import "../stylesheet/images.css";
import { withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";
import { compose } from 'redux';

class HospitalSearchLoc extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            latitude :'',
            longitude:'',
            flag : false,
            response : {},
            loading_map : true,
        }
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
    }


    async componentDidMount() {
        if(this.props.cookies.get('user')===undefined){
            alert("로그인 시간이 만료되었습니다. ");
            document.location.href="/";
        }
        const showPosition=(position)=>{
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                loading_map : false,
            });
            console.log(typeof this.state.longitude);
            console.log("success");
        }


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("이 브라우저에서는 Geolocation이 지원되지 않습니다. 임의의 지역으로 설정합니다. ")
            this.setState({
                latitude: 37.283534027643626,
                longitude: 127.0482432070277,
                loading_map : false,
            });
        }

    }

    handleFormSubmit(e){
        e.preventDefault()
        this.props.history.push("/hospitalsearch/byloc/"+this.state.latitude+"/"+this.state.longitude);

    }



    render() {
            const {loading_map} = this.state;
           // console.log(loading_map);
                return (
                    <div>
                        <form onSubmit={this.handleFormSubmit} className={"searchForm"}>
                            <div className={"searchField"}>
                                <h3>현위치</h3>
                                {loading_map===false ? <h5>위도 : {this.state.latitude} , 경도 : {this.state.longitude}</h5>: <img src={'/images/hospitalSearch/findLatLong.png'} alt={"find Lat Long"}/>}
                                <div className="kakaomap">
                                    {loading_map===false ? <Map latitude={this.state.latitude} longitude={this.state.longitude} loading = {this.state.loading_map}/> : <p></p>}
                                </div>
                                <br />
                                <input type={"image"} src={'/images/hospitalSearch/search.png'} className={'search'} alt={"search"}/>
                                {/*<button className={"searchField"} type={"submit"}>Search</button>*/}
                            </div>
                        </form>
                    </div>
                );

        }


}

export default compose(
    withCookies,withRouter
)(HospitalSearchLoc);
