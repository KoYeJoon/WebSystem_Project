import React from "react";
import "../stylesheet/service.css"
import "../stylesheet/images.css";
import requestRecord from "../../lib/requestRecord";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";


class RecordCreate extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state={
            hospitalName:"",
            date:"",
            time:"",
            treatInfo:"",
            userIdNum : props.cookies.get('user'),
        }

        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleValueChange=this.handleValueChange.bind(this);
    }

    async componentDidMount() {
        if(this.props.cookies.get('user')===undefined){
            alert("로그인 시간이 만료되었습니다. ");
            return document.location.href="/";
        }

    }


    async handleFormSubmit(e){
        e.preventDefault()

        let res = await requestRecord.createRecord({title : this.state.hospitalName, date : this.state.date,
        time : this.state.time, treatInfo : this.state.treatInfo, userIdNum : this.state.userIdNum});
        console.log(res);
        if(res.body==="save"){
            alert("저장 완료");
            document.location.href="/recordlist";
        }
        else{
            alert("진료내역 추가에 실패하였습니다. 다시 시도해주세요.");
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
                <img src={'/images/recordList/recordListAddTitle.png'} className={'recordListAddTitle'} alt={"recordListAdd"}/>
            <div className={"box"}>
                    <form onSubmit = {this.handleFormSubmit} className={"createRecord"}>
                    <label className={"createRecord"}>진료병원</label>
                    <input className={"createRecord"} name={"hospitalName"} value={this.state.hospitalName} onChange={this.handleValueChange}required />
                    <br />
                    <label className={"createRecord"}>진료날짜</label>
                    <input className={"createRecord"} type="date" name={"date"} value={this.state.date} onChange={this.handleValueChange}required />
                    <br />
                    <label className={"createRecord"}>진료시간</label>
                    <input className={"createRecord"} type="time" name={"time"} value={this.state.time} onChange={this.handleValueChange} required/>
                    <br />
                    <div className={"createRecord"}>
                    <label>진료내역</label>
                    </div>
                    <textarea className={"createRecord"} name={"treatInfo"} style={{minHeight : '30vh', minWidth : '50vw'}} value={this.state.treatInfo} onChange={this.handleValueChange} />
                    <br />
                        <input type={"image"} src={'/images/recordList/recordListAdd.png'} className={'recordListAdd2'} alt={"recordList add"} />
                    </form>
            </div>
            </div>

        );
    }

};

export default withCookies(RecordCreate);
