import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import "../stylesheet/service.css"
import {Link} from "react-router-dom";
import requestIndex from "../../lib/requestIndex";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarMod from "./CalendarMod";
import "../stylesheet/images.css";
import regexTestAndSort from "../../lib/regexTestAndSort";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

class Calendar extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        // const loginInfo = sessionStorage.getItem("loginInfo");
        // const parseLoginInfo = JSON.parse(loginInfo);
        this.state={
            records : [],
            loading: false,
            record_id : "",
            pop : false,
            userIdNum : props.cookies.get('user'),
        }
    }
    async componentDidMount() {
        if(this.props.cookies.get('user')===undefined){
            alert("로그인 시간이 만료되었습니다. ");
            document.location.href="/";
        }
        let res = await requestIndex.getAllRecordList({userIdNum : this.state.userIdNum});
        this.setState({
            records : res.record,
            loading : true,
        })
    }


    handleEventClick = ({ event, el }) => {
       // console.log(event)
        this.setState({
            popup : true,
            record_id : event._def.publicId,
        })
    };

    onlyChangePopUp = ()=>{
        this.setState({
            popup : false,
        })
    }

    changePopupAndReload=()=>{
        this.setState({
            popup : false,
        })
        window.location.reload();
    }

    render() {
            const records = this.state.records;
            const loading = this.state.loading;
            const popup = this.state.popup;
            const record_id = this.state.record_id;


            const sortedRecords = regexTestAndSort.sortOld(records);

            const event = sortedRecords.map((record,index) => {
                return({
                        id : record._id,
                        title : record.title,
                        start : record.date+ 'T'+record.time,
                        description : record.treatInfo,
                    }
                )
            });

            return (
                <div>
                    <img src={'/images/calendar/calendarTitle.png'} className={'calendarTitle'} alt={"calendar"}/>
                    <div className={"calendar"}>
                        {
                            loading ?
                                <FullCalendar
                                    // defaultView="dayGridMonth"
                                    plugins={[ dayGridPlugin , interactionPlugin]}
                                    events={event}
                                    height={600}
                                    eventClick={this.handleEventClick}
                                />
                                :
                                <p>loading...</p>
                        }
                    </div>
                    {popup ? <CalendarMod id={record_id} onlyChangePopUp={this.onlyChangePopUp} changePopupAndReload={this.changePopupAndReload}/> : <p></p>}
                    <Link to={"/calendar/create"}>
                        <img src={'/images/calendar/calendarAdd.png'} className={'calendar'} alt={"calendar add"}/>
                    </Link>
                </div>
            );
        }

}

export default withCookies(Calendar);
