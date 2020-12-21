import React from 'react';
import '../stylesheet/loginMenu.css';
import '../stylesheet/images.css';
import { Link} from 'react-router-dom';
import requestAuth from "../../lib/requestAuth";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";
import { withRouter } from 'react-router-dom';
import {compose} from "redux";

class Login extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);
        this.state={
            id:'',
            password:'',
        }
        this.handleValueChange= this.handleValueChange.bind(this);
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    async onSubmit(e){
        e.preventDefault();

        let res = await requestAuth.doLogin({id:this.state.id, password:this.state.password});
        if(res.success==="login"){
            // const id = this.state.id;
            // const id_num = res._id;
            // const complete = true;
            // const loginInfo = {
            //     id,
            //     id_num,
            //     complete
            // }
            // sessionStorage.setItem("loginInfo",JSON.stringify(loginInfo));
            const {cookies} = this.props;
            cookies.set('user',res._id,{path:'/',expires : new Date(Date.now()+1000*60*60*24)});
            alert("로그인이 완료되었습니다.");
            this.props.history.push("/todo");

        }
        else{
            alert("id, 비밀번호를 확인하세요.");
        }

    };

    render() {

        return (
            <div>
                <img src={'/images/auth/loginTitle.png'} className={'loginTitle'} alt={"loginTitle"}/>
                <div className={"box-login"}>
                    <form onSubmit={this.onSubmit.bind(this)} >
                        <div>
                            <label className={"login"}>아이디</label>
                            <input name="id" value={this.state.id} required onChange={this.handleValueChange} className={"login"} />
                        </div>
                        <div>
                            <label className={"login"}>비밀번호</label>
                            <input name="password" type="password" value={this.state.password} required onChange={this.handleValueChange} className={"login"} />
                        </div>
                        <div>
                            <input type={"image"} src={'/images/auth/login.png'} className={'loginBtn'} alt={"login"}/>
                        </div>
                    </form>
                    <h4>아이디가 없으신가요?</h4>
                    <Link to={"/signup"}>
                    <h4>가입하기</h4>
                    </Link>
                </div>
            </div>
        );
    }

};


export default compose(
    withCookies,withRouter
)(Login);