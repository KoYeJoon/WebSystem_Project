import { Link} from 'react-router-dom';
import Record from "./Record";
import React from 'react';
import "../stylesheet/service.css"
import "../stylesheet/images.css";
import requestIndex from "../../lib/requestIndex";
import regexTestAndSort from "../../lib/regexTestAndSort";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";

class RecordList extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        // const loginInfo = sessionStorage.getItem("loginInfo");
       // const parseLoginInfo = JSON.parse(loginInfo);
        this.state = {
            records: [],
            loading : false,
            name : "",
            ascending : true,
            nameOrCity : true,
            userIdNum : props.cookies.get('user'),
        }
        this.handleAscending=this.handleAscending.bind(this);
        this.handleValueChange=this.handleValueChange.bind(this);
        this.handleName=this.handleName.bind(this);
    }


    async componentDidMount() {
        if(this.props.cookies.get('user')===undefined){
            alert("로그인 시간이 만료되었습니다. ");
            return document.location.href="/";
        }
        let res = await requestIndex.getAllRecordList({userIdNum : this.state.userIdNum});
        this.setState({
            records : res.record,
            loading : true,
        });

    }


    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleAscending(e){
        // console.log(e.target);
        if(e.target.value==="descending") {
            this.setState({
                ascending : false,
            })
        }
        else{
            this.setState({
                ascending : true,
            })
        }
    }

    handleName(e){
        // console.log(e.target);
        if(e.target.value==="byName"){
            this.setState({
                nameOrCity : true,
            })
        }
        else{
            this.setState({
                nameOrCity : false,
            })
        }
    }


    renderSearch(){
        if(this.state.nameOrCity===true){
            return(
                <Link to ={`/recordlist/searchbyname/${this.state.name}`}>
                    <button className={"recordListSearch"}>Search</button>
                </Link>
            );
        }
        else{
            return(
                <Link to ={`/recordlist/searchbycontent/${this.state.name}`}>
                    <button className={"recordListSearch"}>Search</button>
                </Link>
            );
        }
    }

    render(){
            const {records}=this.state;
            const {ascending}= this.state;
            const sortedRecordFunc = () => {
                if(ascending===true){
                    return regexTestAndSort.sortOld(records);
                }
                else{
                    return regexTestAndSort.sortNew(records);
                }
            }
            const sortedRecords = sortedRecordFunc(ascending);
            //console.log(ascending);

            return(
                <div>
                    <img src={'/images/recordList/recordListTitle.png'} className={'recordListTitle'} alt={"recordList"}/>
                    <div className={"recordListSearch"}>
                        <select className={"recordListAscending"} onChange={this.handleAscending}>
                            <option value = "ascending">오래된순</option>
                            <option value = "descending">최신순</option>
                        </select>
                        <select className={"recordListSearch"} onChange={this.handleName}>
                            <option value = "byName">병원 이름 기반 검색</option>
                            <option value="byContent">진료 내용 기반 검색</option>
                        </select>
                        <input className={"recordListSearch"}name={"name"} value={this.state.name} onChange={this.handleValueChange}required />
                        {this.renderSearch()}
                        <br />
                        <Link to={"/record/create"}>
                            <img src={'/images/recordList/recordListAdd.png'} className={'recordListAdd'} alt={"recordListAdd"}/>
                            {/*<button className={"recordListSearch"}>내역 추가하기</button>*/}
                        </Link>
                        <br />
                        <div>
                        {this.state.loading
                            ? <Record records={sortedRecords} />
                            : <h2>loading...</h2>}
                        </div>
                    </div>

                </div>
            );
        }

};

export default withCookies(RecordList);
