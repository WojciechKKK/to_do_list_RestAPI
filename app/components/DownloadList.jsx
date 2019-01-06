import React, { Component } from 'react'

class DownloadList extends Component{
    constructor(props){
        super(props);
        this.state={
            valueButton: "Download tasks",
            titleButton: "Download all tasks from the Database",
            question: "Are you sure want to download tasks from Database and delete actually list ?"
        }
    }
    //download tasks from database
    clickDownloadTasks = () => {
        if(typeof this.props.fnDownload && typeof this.props.fnConfirm == 'function'){
            this.props.fnConfirm(this.state.question, this.props.fnDownload)
        }
    }
    render(){
        const {valueButton , titleButton } = this.state
        return (
            <div className="styleBtnDownload" title={titleButton} onClick={this.clickDownloadTasks}>
                {valueButton}
            </div>
        )
    }
}

export default DownloadList