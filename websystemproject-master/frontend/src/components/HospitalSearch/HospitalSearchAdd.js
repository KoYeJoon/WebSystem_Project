import React from 'react';
import "../stylesheet/service.css"
import "../stylesheet/images.css";
import { withRouter } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";
import { compose } from 'redux';

class HospitalSearchAdd extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            cityName1 : '',
            cityName2 :'',
            flag :true,
            response : {},
            loading : true,
        }
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleValueChange=this.handleValueChange.bind(this);
    }

    async componentDidMount() {
        if(this.props.cookies.get('user')===undefined){
            alert("로그인 시간이 만료되었습니다. ");
            document.location.href="/";
        }
    }

    handleFormSubmit(e){
        e.preventDefault()
        this.props.history.push("/hospitalsearch/byaddress/"+this.state.cityName1+"/"+this.state.cityName2);
    }



    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }



    render(){
        return(
            <div>
                <form onSubmit = {this.handleFormSubmit} className={"searchForm"}>
                    <div className={"searchField"}>
                        <label>시/도</label>
                        <input className={"searchField"} name={"cityName1"} value={this.state.cityName1} onChange={this.handleValueChange} required/>
                    </div>
                    <div className={"searchField"}>
                        <label>시/군/구</label>
                        <input className={"searchField"} name={"cityName2"} value={this.state.cityName2} onChange={this.handleValueChange} required/>
                        <br />
                        <input type={"image"} src={'/images/hospitalSearch/search.png'} className={'search'} alt={"search"}/>
                        {/*<button className={"searchAdd"} type={"submit"} >Search</button>*/}
                    </div>
                </form>
            </div>
        );


    }
}


export default compose(
    withCookies,withRouter
)(HospitalSearchAdd);