import React from "react";
import "./stylesheet/service.css";
import "./stylesheet/images.css";
import requestIndex from "../lib/requestIndex";
import regexTestAndSort from "../lib/regexTestAndSort";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";
import Footer from "./Footer";


class TodoList extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        // const loginInfo = sessionStorage.getItem("loginInfo");
        // const parseLoginInfo = JSON.parse(loginInfo);
        this.state = {
            records : [],
            loading : false,
            userIdNum : props.cookies.get('user'),
        }
    }

    async componentDidMount() {
        let date = new Date();
        let month=date.getMonth()+1;
        let day=date.getDate();
        if(month<10){
            month = "0"+month;
        }
        if(day<10){
            day = "0"+day;
        }

        //console.log(date.getFullYear()+'-'+month+'-'+day);
        let today = date.getFullYear()+'-'+month+'-'+day;
        // const {cookies} = this.props;
        // console.log(cookies.getAll());
        if(this.state.userIdNum){
            let res = await requestIndex.getTodoList({userIdNum : this.state.userIdNum,today : today});
            this.setState({
                records : res.record,
                loading : true,
            })
        }
        else{
            alert("로그인이 만료되었습니다.")
            document.location.href='/';
        }
    }

    render(){
        let loading = this.state.loading;
        let records = this.state.records;
        const todos = regexTestAndSort.sortOld(records);


        if(loading===true){
            if(records.length===0){
                return(
                    <div>
                        <img src={'/images/todoList.png'} className={'todo'} alt={"todoList"}/>
                        <br />
                        <h3 className={"todoTotal"}>해야할 일 Total : {records.length}</h3>
                        <div className={"todolist"}>
                            <img src={'/images/noTodo.png'} className={'noTodo'} alt={"nothing to do"}/>
                            {/*<p>오늘 해야할 일이 없습니다. </p>*/}
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <div>
                        <img src={'/images/todoList.png'} className={'todo'} alt={"todoList"}/>
                        <br />
                        <h3 className={"todoTotal"}>해야할 일 Total : {records.length}</h3>
                        <ul className={"todolist"}>
                            <br />
                            {todos.map((todo,index) =>
                                {
                                    return(
                                        <li key={index} className={"todolist"}>
                                            <pre>{todo.title}   / 시간 - {todo.time}</pre>
                                        </li>
                                    )
                                }
                            )}
                        </ul>
                    </div>
                )
            }
        }
        else{
            return(
                <div>
                    <p>loading...</p>
                </div>
            )
        }

    }
};

export default withCookies(TodoList);

