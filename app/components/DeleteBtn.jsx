import React, {Component} from 'react'

class DeleteBtn extends Component{
    constructor(props){
        super(props)
    }
    deleteAllTask = () =>{
        if(typeof this.props.fnD == 'function'){
            let confirmQuestion = confirm('Are you sure want to delete list of all tasks ?');
            if(confirmQuestion == true){
            this.props.fnD();
            }
        }
    }
    render(){
        return(
            <div className="styleBtnDelete" title="Delete all tasks" onClick={this.deleteAllTask}>
                Delete list
            </div>
        )
    }
}

export default DeleteBtn