import React, { Component } from 'react';

class ToDoItem extends Component{
    constructor(props){
      super(props);
      this.state = {
        done: this.props.done,
      }
    }

    //send task
    saveTask = () => {
      //tutaj można dorbić PUT i aktualizować done w bazie if(this.props.info  == 'saved'){
      let confirmQuestion = confirm('Are you sure want to save your task in Database ?');
      if(confirmQuestion == true){
        const {element} = this.props;
        const { done } = this.state;
        let newElementFromList = {
          'name': element, 
          'done': done,
          'saved': 'saved'
          };
        fetch('http://localhost:3000/tasks', {
        method: "post",
        headers: {
              "Content-type": "application/json; charset=UTF-8"
          },
        body: JSON.stringify(newElementFromList)
          })
        .then(res => res.json())
        .then(res => {
            console.log(`Task ${element} został dodany`);
          })
        .catch(error => alert('Brak połączenia z bazą danych -> RestAPI'));
      
      //delete saved task from list (update view)
      this.props.fnDelete(this.props.title);
      setTimeout(()=> {
        alert(`Task ${this.props.title.name} has been saved in the Database`)
        },300);
      }
    }

    //change state/color - task color- TO MODIFY !!!
    toggleDone = () =>{
      this.setState({
        done: !this.state.done
       });
      //  console.log('zmieniam color')
     }

     //delete task
    deleteItemTask = (e) => {
      if(typeof this.props.fnDelete == 'function'){
        let confirmQuestion = '';
          {this.props.info == 'saved' 
          ? confirmQuestion = confirm('Are you sure want to delete task from Database ?')
          : confirmQuestion = confirm('Are you sure want to delete task from actually list ?')
          }
        confirmQuestion ? this.props.fnDelete(this.props.title) : false
      }
    }

    render(){
      return(
        <div>
          <p className={this.state.done ? 'doneToDo' : ''} onClick={this.toggleDone}>
            {this.props.element}
          </p>
          <div onClick={this.deleteItemTask} className="deleteTask" title="Delete"></div> 
          {this.props.info == 'saved'
          ? <i className="info-saved">saved</i>
          : <div onClick={this.saveTask} className="saveTask" title="Save"></div>}
        </div>
      )
    }
  }
 
  export default ToDoItem;

