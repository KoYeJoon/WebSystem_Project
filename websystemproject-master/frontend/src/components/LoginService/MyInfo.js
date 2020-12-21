import React from 'react';
import '../stylesheet/loginMenu.css';
import '../stylesheet/images.css';
import requestAuth from "../../lib/requestAuth";
import regexTestAndSort from "../../lib/regexTestAndSort";
import { withCookies, Cookies } from 'react-cookie';
import {instanceOf} from "prop-types";
import { withRouter } from 'react-router-dom';
import {compose} from "redux";

class MyInfo extends React.Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);
        this.state={
            id:'',
            password:'',
            passwordCheck : '',
            passwordError:false,
            name : '',
            passwordRegexTest : false,
            nameRegexTest : true,
            userIdNum : props.cookies.get('user'),
        }
    }

    async componentDidMount() {
        if(this.props.cookies.get('user')===undefined){
            alert("로그인 시간이 만료되었습니다. ");
            return document.location.href="/";
        }
        let res = await requestAuth.getMyInfo({userIdNum : this.state.userIdNum});
        this.setState({
            id : res.user.id,
            name : res.user.name,
        });

    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
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
           // console.log(this.state.name);
        }

    }

    async onSubmit(e){
        e.preventDefault();
        if(this.state.password !== this.state.passwordCheck){
            this.setState({
                setPasswordError:true,
            })
        }


        console.log(this.state.passwordRegexTest , this.state.nameRegexTest,this.state.passwordError)
        if(this.state.passwordRegexTest && this.state.nameRegexTest&& !this.state.passwordError){
            let res = await requestAuth.postMyInfo({userIdNum : this.state.userIdNum, password : this.state.password,
                name : this.state.name});
            if(res.err===null){
                alert("개인 정보 수정이 완료되었습니다.");
                document.location.href="/todo";
            }
            else{
                alert("개인 정보 수정에 실패하였습니다. 다시 시도해주세요.");
            }
        }
        else{
            alert("입력 양식을 확인해주세요.");
        }

    };

    onChangePasswordChk = (e) => {
        this.setState({
            passwordCheck : e.target.value,
            passwordError : e.target.value !== this.state.password,
        })

    };


    async deleteInfo(e){
        e.preventDefault();
        let answer = window.confirm("계정을 삭제하시겠습니까?");
        if(answer===true){
            let res = await requestAuth.deleteMyInfo({userIdNum : this.state.userIdNum});
            if(res.result==="success"){
                alert("계정이 삭제되었습니다.");
                // sessionStorage.removeItem("loginInfo");
                this.props.cookies.remove('user');
                this.props.history.push("/");
            }
            else{
                alert("계정 삭제에 실패하였습니다. 다시 시도해주세요.");
            }

        }
    }

    render() {
        return (
            <div>
                <img src={'/images/auth/myInfoTitle.png'} className={'myInfoTitle'} alt={"myInfoTitle"}/>
                <div className={"box-myInfo"}>
                    <form onSubmit={this.onSubmit.bind(this)} >
                        <h4 className={"myInfo"}>아이디 : {this.state.id}</h4>
                        <div>
                            <label className={"myInfo"}>비밀번호</label>
                            <input name="password" type="password" value={this.state.password} required onChange={this.handleCheckPassword} className={"myInfo"} />
                            {!this.state.passwordRegexTest && <div className={"warningPW"}style={{color : 'red', fontSize : 'small'}}>8-10자의 영문 및 숫자를 조합하세요. </div>}
                        </div>
                        <div>
                            <label className={"myInfo"}>비밀번호체크</label>
                            <input name="passwordCheck" type="password" value={this.state.passwordCheck} required onChange={this.onChangePasswordChk} className={"myInfo"} />
                            {this.state.passwordError && <div className={"warningPwck"} style={{color : 'red', fontSize : 'small'}}>비밀번호가 일치하지 않습니다.</div>}
                        </div>
                        <div>
                            <label className={"myInfo"}>이름</label>
                            <input name="name" value={this.state.name} required onChange={this.handleCheckName} className={"myInfo"}/>
                            {!this.state.nameRegexTest && <div className={"warningName"} style={{color : 'red',fontSize : 'small'}}>2-4자의 한글 이름을 입력하세요.</div>}
                        </div>
                        <div>
                            <input type={"image"} src={'/images/auth/myInfoMod.png'} className={'myInfoMod'} alt={"myInfor mod"}/>
                            <img src={'/images/auth/myInfoRemove.png'} className={'myInfoMod'} alt={"myInfo remove"} onClick={this.deleteInfo.bind(this)}/>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

};


export default compose(
    withCookies,withRouter
)(MyInfo);