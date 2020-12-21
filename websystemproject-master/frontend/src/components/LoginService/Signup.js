import React from 'react';
import '../stylesheet/loginMenu.css';
import '../stylesheet/images.css';
import requestAuth from "../../lib/requestAuth";
import regexTestAndSort from "../../lib/regexTestAndSort";
import {Link, withRouter} from "react-router-dom";

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:'',
            password:'',
            passwordCheck : '',
            idCheck : false,
            idRegexTest: false,
            passwordRegexTest : false,
            nameRegexTest : false,
            passwordError:false,
            name : '',
        }

    }

    handleValueChange=(e)=> {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    async checkID(e){
        e.preventDefault();
        console.log(this.state.id);
        if(this.state.id===""){
            alert("id를 입력하세요.")
        }
        else if(!this.state.idRegexTest){
            alert("제대로된 형식의 id를 입력하세요. ");
        }
        else{
            let res = await requestAuth.confirmId({id : this.state.id});
            if(res.success==="fail"){
                alert("아이디가 존재합니다.");
                this.setState({
                    id: '',
                })
            }
            else{
                alert("사용 가능한 아이디입니다.");
                this.setState({
                    idCheck: true,
                })
            }
        }
    }

    handleCheckID = (e)=>{
        this.handleValueChange(e);
        if(regexTestAndSort.handleCheckID(e.target.value)){
            this.setState({
                idRegexTest : true,
            })
        }
        else{
            this.setState({
                idRegexTest : false,
            })
        }


       if(this.state.idCheck && this.state.id!==e.target.value){
           this.setState({
               idCheck : false,
           })
       }

    }

    handleCheckPassword = (e)=>{
        this.handleValueChange(e);
        if(regexTestAndSort.handleCheckPW(e.target.value)){
            this.setState({
                passwordRegexTest : true,
            })
        }
        else{
            this.setState({
                passwordRegexTest : false,
            })
        }
    }

    handleCheckName = (e) => {
       this.handleValueChange(e);
        if(regexTestAndSort.handleCheckName(e.target.value)){
            this.setState({
                nameRegexTest : true,
            })
        }
        else{
            this.setState({
                nameRegexTest : false,
            })
        }
    }
    async onSubmit(e){
        e.preventDefault();
        if(this.state.password !== this.state.passwordCheck){
            this.setState({
                setPasswordError:true,
            })
        }


        if(this.state.idCheck && this.state.idRegexTest && this.state.passwordRegexTest && this.state.nameRegexTest&& !this.state.passwordError){
            let res = await requestAuth.createAuth({id:this.state.id, password : this.state.password, name : this.state.name});
            console.log(res);
            if(res.body==="save"){
                alert("회원 가입이 완료되었습니다.");
                this.props.history.push("/");
                //document.location.href="/";
            }
            else{
                alert("회원 가입에 실패하였습니다. 다시 시도해주세요.");
            }

        }
        else if(!this.state.idCheck){
            alert("id를 확인하세요.");
        }
        else{
            alert("알맞은 형식을 입력하세요. ");
        }

    };

    onChangePasswordChk = (e) => {
        this.setState({
            passwordCheck : e.target.value,
            passwordError : e.target.value !== this.state.password,
        })

    };

    render() {

        return (
            <div>
                <div className={"logo"}>
                    <Link to={'/'}><img src={'/images/mainPageTitle.png'} className={'mainImg'} alt={"Home"}/></Link>
                </div>
                <div className={"box-signUp"}>
                <img src={'/images/auth/signUpTitle.png'} className={'signUpTitle'} alt={"sign up"}/>
                    <form onSubmit={this.onSubmit.bind(this)} >
                        <div className={"idInput"}>
                            <label className={"signUp"}>아이디</label>
                            <input name="id" value={this.state.id} required onChange={this.handleCheckID} className={"signUp"} placeholder={"아이디"}/>
                            <button name="user-id-confirm" className = {"idConfirm"} onClick={this.checkID.bind(this)}>아이디 중복 확인</button>
                            {!this.state.idRegexTest && <div className={"warningID"} style={{color : 'red', fontSize : 'small'}}>5-10자의 영문 혹은 숫자를 입력하세요. </div>}
                    </div>
                    <div className={"pwInput"}>
                    <label className={"signUp"}>비밀번호</label>
                    <input name="password" type="password" value={this.state.password} required onChange={this.handleCheckPassword} className={"signUp"} placeholder={"비밀번호"}/>
                    {!this.state.passwordRegexTest && <div className={"warningPW"} style={{color : 'red', fontSize : 'small'}}>8-10자의 영문 및 숫자를 조합하세요. </div>}
                    </div>
                    <div  className={"pwCkInput"}>
                    <label className={"signUp"}>비밀번호체크</label>
                    <input name="passwordCheck" type="password" value={this.state.passwordCheck} required onChange={this.onChangePasswordChk} className={"signUp"} placeholder={"비밀번호 확인"} />
                    {this.state.passwordError && <div className={"warningPwck"} style={{color : 'red', fontSize : 'small'}}>비밀번호가 일치하지 않습니다.</div>}
                    </div>
                    <div className={"nameInput"}>
                    <label className={"signUp"}>이름</label>
                    <input name="name" value={this.state.name} required onChange={this.handleCheckName} className={"signUp"} placeholder={"홍길동"}/>
                    {!this.state.nameRegexTest && <div className={"warningName"} style={{color : 'red',fontSize : 'small'}}>2-4자의 한글 이름을 입력하세요.</div>}
                    </div>
                    <div>
                    <input type={"image"} src={'/images/auth/signUp.png'} className={'signUpBtn'} alt={"sign up"}/>
                    {/*<Button type="primary" htmlType="submit" src={'/images/signup/signUp.png'} />*/}
                    </div>
                    </form>
                </div>
        </div>
        );
    }

};


export default withRouter(Signup);
