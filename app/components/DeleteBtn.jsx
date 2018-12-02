import React, {Component} from 'react'

class DeleteBtn extends Component{
    constructor(props){
        super(props);
        this.state = {
            valueButton: "Delete list",
            titleButton: "Delete all list of the tasks",
            question: "Are you sure want to delete actually list with the tasks ?"
        }
    }
    //clear list
    deleteAllTask = () =>{
        if(typeof this.props.fnD && typeof this.props.fnConfirm== 'function'){
            this.props.fnConfirm(this.state.question, this.props.fnD)
        }
    }
    render(){
        const { valueButton, titleButton } = this.state
        return(
            <div className="styleBtnDelete" title={titleButton} onClick={this.deleteAllTask}>
                {valueButton}
            </div>
        )
    }
}

export default DeleteBtn