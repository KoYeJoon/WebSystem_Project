import React from "react";
import { Link } from "react-router-dom";
import "../stylesheet/service.css"
import "../stylesheet/images.css";
import {recordPaginate} from "./RecordPaginate";
import RecordFooter from "./RecordFooter";

class Record extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            records : props.records,
            match : props.match,
            pageSize : 10,
            currentPage : 1,
        }
    }

    render(){
        const {records} = this.state;
        const handlePageChange = (page) => {
            this.setState({
                currentPage: page
            });
        }
        const pagedRecords= recordPaginate(records, this.state.currentPage, this.state.pageSize);

        const recordList = pagedRecords.map((record,index)=>{
            let date = record.date;
            let time = record.time;
            return(
                <tr key={index}>
                    <td className={"RecordTable"}>{(this.state.currentPage-1)*10+index+1}</td>
                    <td className={"RecordTable"}><Link to={`/recordlist/${record._id}`}>{record.title}</Link></td>
                    <td className={"RecordTable"}>{date} {time}</td>
                </tr>
            )
        });

        if(records.length === 0){
            return(
            <div className={"box-recordList"}>
                <img src={'/images/recordList/noRecordList.png'} className={'noRecordList'} alt={"no Record List"}/>
            </div>
            );
        }
        else{
            return (
                <div>
                    <h4 className={"recordCount"}>총 {records.length} 개의 진료 내역이 있습니다.</h4>
                    <table className={"RecordTable"}>
                        <thead>
                        <tr>
                            <th>Index</th>
                            <th>병원 이름</th>
                            <th>진료 날짜 및 시간</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recordList}
                        </tbody>
                    </table>

                    <RecordFooter itemsCount={records.length} pageSize={this.state.pageSize} currentPage={this.state.currentPage}
                                  onPageChange={handlePageChange}/>
                </div>

            );
        }

    }

};

export default Record;
