import React from 'react';
import HospitalSearchHeader from './HospitalSearchHeader';


class HospitalSearch extends React.Component {

    render(){
        return (
            <div>
                <img src={'/images/hospitalSearch/hospitalSearchTitle.png'} className={'hospitalSearchTitle'} alt={"hospitalSearch"}/>
                <HospitalSearchHeader />
                {this.props.children}
            </div>
        );
    }

};

export default HospitalSearch;