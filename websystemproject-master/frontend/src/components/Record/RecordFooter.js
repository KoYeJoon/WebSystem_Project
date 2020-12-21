import React from "react";
import "../stylesheet/service.css"
import "../stylesheet/images.css";
import _ from 'lodash';

class RecordFooter extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            itemsCount : props.itemsCount,
            pageSize : props.pageSize,
            currentPage : props.currentPage,
            onPageChange : props.onPageChange,
            activePage : 1,
        }
    }


    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
    }

    render(){
        const pageCount = Math.ceil(this.props.itemsCount/this.props.pageSize);
        if(pageCount === 1) return null;

        let pages;

        if(pageCount > 5 && this.props.currentPage>5){
            if(pageCount<=this.props.currentPage+3){
                pages=_.range(this.props.currentPage-(this.props.currentPage+4-pageCount),pageCount+1);
            }
            else{
                pages=_.range(this.props.currentPage-2,this.props.currentPage+3);
            }
        }
        else if(pageCount > 5 && this.props.currentPage<=5){
            pages=_.range(1,6);
        }
        else{
            pages=_.range(1,pageCount+1);
        }



        return (
            <div>
            <nav>
                <table className={"pageCount"}>
                    <tbody>
                <tr className={"pageCount"}>
                    <td className={"page-item"} ><button className={"page-link"} onClick={() => this.props.onPageChange(1)}>First</button></td>
                    {this.props.currentPage>1 ?
                        <td className={"page-item"} ><button className={"page-link"} onClick={() => this.props.onPageChange(this.props.currentPage-1)}>Prev</button></td>
                    : <td className={"page-item"} ><button className={"page-link"}>Prev</button></td>}
                    {pages.map(page => (
                        <td
                            key={page}
                            className={page === this.props.currentPage ? "page-item active" : "page-item"}>
                            <button className={"page-link"}onClick={() => this.props.onPageChange(page)}>{page}</button>
                        </td>
                    ))}
                    {this.props.currentPage<pageCount ?
                        <td className={"page-item"} ><button className={"page-link"} onClick={() => this.props.onPageChange(this.props.currentPage+1)}>Next</button></td>
                        : <td className={"page-item"} ><button className={"page-link"}>Next</button></td>}
                    <td className={"page-item"} ><button className={"page-link"} onClick={() => this.props.onPageChange(pageCount)}>Last</button></td>
                </tr>
                    </tbody>
                </table>
            </nav>
            </div>
        );

    }

};

export default RecordFooter;
