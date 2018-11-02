import React, { Component } from 'react'

class DownloadList extends Component{
    constructor(props){
        super(props);
       
    }
    clickDownloadTasks = () => {
        if(typeof this.props.fnDownload == 'function'){
            let confirmQuestion = confirm('Are you sure to download tasks from local file and add do list ?');
            if(confirmQuestion == true){
            this.props.fnDownload();
            }
        }
    }
    render(){
        return (
            <div className="styleBtnDownload" title="Download all tasks" onClick={this.clickDownloadTasks}>
                Download tasks
            </div>
        )
    }
}

export default DownloadList