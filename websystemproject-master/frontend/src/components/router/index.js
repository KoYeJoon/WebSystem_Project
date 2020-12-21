import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "../Home";
import Calendar from "../Calendar/Calendar";
import RecordList from "../Record/RecordList";
import HospitalSearch from "../HospitalSearch/HospitalSearch";
import HospitalSearchAdd from "../HospitalSearch/HospitalSearchAdd";
import HospitalSearchLoc from "../HospitalSearch/HospitalSearchLoc";
import HospitalSearchName from "../HospitalSearch/HospitalSearchName";
import RecordCreate from "../Record/RecordCreate";
import RecordMod from "../Record/RecordMod";
import RecordListSearchByName from "../Record/RecordListSearchByName";
import CalenderCreate from "../Calendar/CalendarCreate";
import RecordListSearchByContent from "../Record/RecordListSearchByContent";
import HospitalNameResult from "../HospitalSearchResult/hospitalNameResult";
import HospitalAddResult from "../HospitalSearchResult/hospitalAddResult";
import HospitalLocResult from "../HospitalSearchResult/hospitalLocResult";
import Signup from "../LoginService/Signup";
import Login from "../LoginService/Login";
import MyInfo from "../LoginService/MyInfo";
import TodoList from "../TodoList";


const RouterApp =() =>{
    return(
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/todo" component={TodoList} />
                <Route path="/signup" component={Signup}/>
                <Route path="/login" component={Login}/>
                <Route path="/myinfo" component={MyInfo} />
                <Route exact path="/calendar" component={Calendar}/>
                <Route path="/calendar/create" component={CalenderCreate} />
                <Route exact path="/recordlist" component={RecordList} />
                <Route exact path="/recordlist/searchbyname/:name" component={RecordListSearchByName} />
                <Route exact path="/recordlist/searchbycontent/:name" component={RecordListSearchByContent} />
                <Route path="/record/create" component={RecordCreate} />
                <Route exact path="/recordlist/:id" component={RecordMod} />
                <Route path="/hospitalsearch" component={HospitalSearch}/>
            </Switch>
            <Switch>
                <Route exact path="/hospitalsearch/byname" component={HospitalSearchName}/>
                <Route path="/hospitalsearch/byname/:name" component={HospitalNameResult} />
                <Route exact path="/hospitalsearch/byaddress" component={HospitalSearchAdd}/>
                <Route path="/hospitalsearch/byaddress/:name1/:name2" component={HospitalAddResult}/>
                <Route exact path="/hospitalsearch/byloc" component={HospitalSearchLoc}/>
                <Route path="/hospitalsearch/byloc/:lat/:long" component={HospitalLocResult}/>
            </Switch>

        </div>
    );
}


export default RouterApp;
