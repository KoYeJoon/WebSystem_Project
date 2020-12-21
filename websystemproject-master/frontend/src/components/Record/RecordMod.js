import React from "react";
import "../stylesheet/images.css";
import requestRecord from "../../lib/requestRecord";

class RecordMod extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id : props.match.params,
            record : [],
            hospitalName : "",
            date:"",
            time:"",
            treatInfo:"",
        }

        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleValueChange=this.handleValueChange.bind(this);
    }

    async componentDidMount() {
        if(this.props.match.params===undefined){
            alert("로그인 시간이 만료되었습니다. ");
            return document.location.href="/";
        }

        let res = await requestRecord.readRecord({id : this.state.id.id});
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


    async handleFormSubmit(e){
        e.preventDefault()

        let answer = window.confirm("진료내역을 수정하시겠습니까?");
        if(answer===true){
            let res = await requestRecord.updateRecord({id : this.state.id.id, title : this.state.hospitalName,
                date : this.state.date, time : this.state.time, treatInfo : this.state.treatInfo})
            console.log(res);

            if(res.err===null){
                alert("수정 완료");
                document.location.href="/recordlist";
            }
            else{
                alert("진료 내역 수정에 실패하였습니다. 다시 시도해주세요.");
            }

        }

    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    deleteRecord = async (e)=>{
        e.preventDefault();
        let answer = window.confirm("진료내역을 삭제하시겠습니까?");
        if(answer===true){
            let res = await requestRecord.deleteRecord({id : this.state.id.id});
            console.log(res);
            if(res.result==="success"){
                alert("삭제 완료");
                document.location.href="/recordlist";
            }
            else{
                alert("삭제에 실패하였습니다. 다시 시도해주세요. ");
            }
        }

    }

    render(){
        return(
            <div>
                <img src={'/images/recordList/recordListModTitle.png'} className={'recordListModTitle'} alt={"recordListMod"}/>
                <div className={"box"}>
                    <form className={"createRecord"} onSubmit={this.handleFormSubmit}>
                        <label className={"createRecord"} >진료병원</label>
                        <input className={"createRecord"} name={"hospitalName"} value={this.state.hospitalName} onChange={this.handleValueChange}required />
                        <br />
                        <label className={"createRecord"}>진료날짜</label>
                        <input className={"createRecord"} type="date" name={"date"} value={this.state.date} onChange={this.handleValueChange}required />
                        <br />
                        <label className={"createRecord"}>진료시간</label>
                        <input className={"createRecord"} type="time" name={"time"} value={this.state.time} onChange={this.handleValueChange} required/>
                        <br />
                        <div className={"createRecord"}>
                        <label className={"createRecord"}>진료내역</label>
                        </div>
                        <textarea className={"createRecord"} name={"treatInfo"} style={{minHeight : '30vh', minWidth : '50vw'}} value={this.state.treatInfo} onChange={this.handleValueChange} />
                        <br />
                        <input type={"image"} src={'/images/recordList/recordListMod.png'} className={'recordListMod'} alt={"recordList mod"}/>
                        <img src={'/images/recordList/recordListRemove.png'} className={'recordListMod'} alt={"recordList remove"} onClick={this.deleteRecord}/>
                        {/*<button className={"createRecord"} type={"submit"}>진료내역 수정하기</button>*/}
                        {/*<button className={"createRecord"} onClick={this.deleteRecord}>진료내역 삭제하기</button>*/}
                    </form>
                </div>
            </div>
        );
    }
};

export default RecordMod;