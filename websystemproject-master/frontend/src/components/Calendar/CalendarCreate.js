import React from "react";
import { withRouter } from 'react-router-dom';
import "../stylesheet/service.css"
import '../stylesheet/images.css'
import requestRecord from "../../lib/requestRecord";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";
import { compose } from 'redux';


class CalendarCreate extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            hospitalName:"",
            date:"",
            time:"",
            userIdNum : props.cookies.get('user'),
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

    async handleFormSubmit(e){
        e.preventDefault()


        let res = await requestRecord.createRecord({title : this.state.hospitalName,
        date : this.state.date,
        time : this.state.time,
        treatInfo : "",
        userIdNum : this.state.userIdNum});

        if(res.body==="save"){
            alert("저장 완료");
            this.props.history.push("/calendar");
        }
        else{
            alert("저장 실패, 다시 시도해주세요");
        }

    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render(){
            return (
                <div>
                    <img src={'/images/calendar/calendarAddTitle.png'} className={'calendarAddTitle'} alt={"calendar add"} />
                    <div>
                        <form onSubmit = {this.handleFormSubmit} className={"createField"}>
                            <label className={"createField"}>진료병원</label>
                            <input className={"createField"} name={"hospitalName"} value={this.state.hospitalName} onChange={this.handleValueChange}required />
                            <br />
                            <label className={"createField"}>진료날짜</label>
                            <input className={"createField"} type="date" name={"date"} value={this.state.date} onChange={this.handleValueChange}required />
                            <br />
                            <label className={"createField"}>진료시간</label>
                            <input className={"createField"} type="time" name={"time"} value={this.state.time} onChange={this.handleValueChange} required/>
                            <br />
                            <input type={"image"} src={'/images/calendar/calendarAdd.png'} className={'calendar'} alt={"calendar add"} />
                        </form>
                    </div>
                </div>

            );

    }

};

export default compose(
    withCookies,withRouter
)(CalendarCreate);
