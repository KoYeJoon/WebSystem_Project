import React from "react";
import'../stylesheet/service.css';

class HospitalResult extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            item : props.item,
        };
    }

    renderFunction(hospital,index){
        return (
            <tr key={index+1}>
                <td className={"hospitalResultTable"}>{index+1}</td>
                <td className={"hospitalResultTable"}>{hospital.dutyName}</td>
                <td className={"hospitalResultTable"}>{hospital.dutyAddr}</td>
                <td className={"hospitalResultTable"}>{hospital.dutyTel1}</td>
            </tr>
        )
    }

    render(){
        const {item} = this.state;
        return(
            <table className={"hospitalResultTable"}>
                <thead>
                <tr>
                    <th>Index</th>
                    <th>병원 이름</th>
                    <th>병원 주소</th>
                    <th>병원 전화번호</th>
                </tr>
                </thead>
                <tbody>
                {item.map(this.renderFunction)}
                </tbody>
            </table>
        );

    }
}



export default HospitalResult;

