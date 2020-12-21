import { Link} from 'react-router-dom';
import Record from "./Record";
import React from 'react';
import "../stylesheet/service.css"
import "../stylesheet/images.css";
import requestRecord from "../../lib/requestRecord";
import regexTestAndSort from "../../lib/regexTestAndSort";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";


class RecordListSearchByContent extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        //검색할 때에 내 아이디를 보내야 함.
        // const loginInfo = sessionStorage.getItem("loginInfo");
        // const parseLoginInfo = JSON.parse(loginInfo);
        // if(parseLoginInfo===null){
        //     return  document.location.href="/";
        // }
        this.state = {
            records: [],
            loading : false,
            name : props.match.params.name,
            userIdNum : props.cookies.get('user'),
        }

        this.handleValueChange=this.handleValueChange.bind(this);

    }


    async componentDidMount() {
        if (this.props.cookies.get('user') === undefined) {
            alert("로그인 시간이 만료되었습니다. ");
            return document.location.href = "/";
        }
        const queryName = encodeURIComponent(this.state.name);
        console.log(this.state.name);
        let res = await requestRecord.contentSearch({userIdNum: this.state.userIdNum, queryName: queryName});
        this.setState({
            records: res.record,
            loading: true,
        })
    }





    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    render(){
        const {records}=this.state;
        // console.log(this.state.loading);

        const sortedRecords = regexTestAndSort.sortOld(records);

        return(
            <div>
                <img src={'/images/recordList/recordListTitle.png'} className={'recordListTitle'} alt={"recordList"}/>
                <div className={"recordListSearch"}>
                    <label className={"recordListSearch"}>진료 내용 기반 검색</label>
                    <input className={"recordListSearch"}name={"name"} value={this.state.name} onChange={this.handleValueChange}required />
                    <Link to ={`/recordlist/`}>
                        <button className={"recordListSearch"}>검색결과 초기화</button>
                    </Link>
                    <br />
                    <Link to={"/record/create"}>
                        <img src={'/images/recordList/recordListAdd.png'} className={'recordListAdd'} alt={"recordListAdd"}/>
                        {/*<button className={"recordListSearch"}>내역 추가하기</button>*/}
                    </Link>
                    {this.state.loading ? <Record records={sortedRecords} /> : <h2>loading...</h2>}
                </div>
            </div>
        )

    }

};

export default withCookies(RecordListSearchByContent);
