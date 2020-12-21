import React from 'react';
import "../stylesheet/service.css";
import "../stylesheet/images.css";
import { withRouter } from 'react-router-dom';
import {compose} from "redux";
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

class HospitalSearchName extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            name : '',
            flag : true,
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
        e.preventDefault();
        this.props.history.push("/hospitalsearch/byname/"+this.state.name);
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
                        <label >병원 이름</label>
                        <input className={"searchField"} name={"name"} value={this.state.name} onChange={this.handleValueChange} required />
                        <br />
                        <input type={"image"} src={'/images/hospitalSearch/search.png'} className={'search'} alt={"search"}/>
                        {/*<button  type={"submit"} className={"searchAdd"} >Search</button>*/}
                    </div>
                </form>
            </div>
        );

    }
}


export default compose(
    withCookies,withRouter
)(HospitalSearchName);
