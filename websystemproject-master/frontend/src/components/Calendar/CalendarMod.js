import React from "react";
import "../stylesheet/service.css"
import requestRecord from "../../lib/requestRecord";

class CalendarMod extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hospitalName : "",
            date : "",
            time : "",
            treatInfo : "",
            id : props.id,
        };
        this.handleValueChange=this.handleValueChange.bind(this);
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleSpanClick = this.handleSpanClick.bind(this);
        this.deleteRecord = this.deleteRecord.bind(this);
    }

    async componentDidMount() {
        if(this.state.id===undefined){
            alert("로그인 시간이 만료되었습니다. ");
            document.location.href="/";
        }
        let res = await requestRecord.readRecord({id : this.state.id})
        this.setState({
            record : res.record,
            loading : true,
        });
        this.setState({
            hospitalName : this.state.record.title,
            date:this.state.record.date,
            time:this.state.record.time,
            treatInfo:this.state.record.treatInfo,
        });
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    async handleFormSubmit(e){
        e.preventDefault()
        let answer = window.confirm("일정을 수정하시겠습니까?");
        if(answer===true){
            let res = await requestRecord.updateRecord({id : this.state.id, title : this.state.hospitalName,
            date : this.state.date, time : this.state.time, treatInfo : this.state.treatInfo})

            if(res.err===null){
                alert("수정 완료");
                this.props.changePopupAndReload();
            }
            else{
                alert("수정에 실패하였습니다. 다시 시도해주세요. ");
            }



        }
    }

    deleteRecord = async (e)=>{
        e.preventDefault();
        let answer = window.confirm("일정을 삭제하시겠습니까?");
        if(answer===true){
            let res = await requestRecord.deleteRecord({id : this.state.id});
            if(res.result==="success"){
                alert("삭제 완료");
                this.props.changePopupAndReload();
            }
            else{
                alert("삭제에 실패하였습니다. 다시 시도해주세요.");
            }
        }
    }


    handleSpanClick(){
        this.props.onlyChangePopUp();
    }

    render(){
        return (
            <div id={"modifyRecord"} className={"modal"}>
                <div className={"modal-content"}>
                    <span className={"close"} onClick={this.handleSpanClick.bind(this)}>&times;</span>
                    <form className={"modifyField"} onSubmit={this.handleFormSubmit}>
                        <img src={'/images/calendar/calendarMod.png'} className={'calendarModTitle'} alt={"calendar mod"} />
                        <br />
                        <label className={"modifyField"}>진료병원</label>
                        <input className={"modifyField"} name={"hospitalName"} value={this.state.hospitalName} onChange={this.handleValueChange}required />
                        <br />
                        <label className={"modifyField"}>진료날짜</label>
                        <input className={"modifyField"} type="date" name={"date"} value={this.state.date} onChange={this.handleValueChange}required />
                        <br />
                        <label className={"modifyField"}>진료시간</label>
                        <input className={"modifyField"} type="time" name={"time"} value={this.state.time} onChange={this.handleValueChange} required/>
                        <br />
                        <div className={"modifyField"}>
                        <label className={"modifyField"}>진료내역</label>
                        </div>
                        <textarea className={"modifyField"} name={"treatInfo"} style={{minHeight : '250px', minWidth : '350px'}} value={this.state.treatInfo} onChange={this.handleValueChange} />
                        <br />
                        <input type={"image"} src={'/images/calendar/calendarModButton.png'} className={'calendarMod'} alt={"calendar mod"}/>
                        <img src={'/images/calendar/calendarRemove.png'} className={'calendarMod'} alt={"calendar remove"} onClick={this.deleteRecord}/>
                    </form>
                    </div>
            </div>
        );
    }

};

export default CalendarMod;