import React, { Component } from 'react';

class ToDoItem extends Component{
  //ustawienei wartości domyślnej dla props
    // static defaultProps = {
    //   done: false,
    // }
    constructor(props){
      super(props);
      this.state = {
        done: this.props.done,
      }
    }

    deleteAfterSave = (e) => {
      if(typeof this.props.deleteItem == 'function'){
        this.props.deleteItem();
      };
      this.setState({
        done: false,
      })
    }

    //send task
    saveTask = () => {
      let confirmQuestion = confirm('Are you sure want to save your task in local file ?');
          if(confirmQuestion == true){
            
      const {element} = this.props;
      const { done } = this.state;
      let newElementFromList = {
        'name': element, 
        'done': done
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
        console.log(res.id)
    })
    .catch(error => alert('Brak połączenia z bazą danych -> RestAPI'));
  
    //delete saved task
    this.deleteAfterSave()
    // this.props.deleteItem();
    console.log('Task został usunięty');
    setTimeout(()=> {
      alert(`Task "${element}" has been saved in the local file`)
    },500)
  }
}

    //change state - task color- TO MODIFY !!!
    toggleDone = () =>{
      this.setState({
        done: !this.state.done
       });
       console.log('zmieniam state')
     }

   
    render(){
      return(
        <div>
          <p  className={this.state.done ? 'doneToDo' : ''} onClick={this.toggleDone}>
          {/* <p  className={this.state.done ? 'doneToDo' : ''} > */}
            {this.props.element}
          </p>
          <div onClick={this.saveTask} className="saveTask" title="Save"></div> 
          <div onClick={this.deleteAfterSave} className="deleteTask" title="Delete"></div> 
        </div>
      )
    }
  }
 
  export default ToDoItem;
  // data-done={this.state.done.toString()}  