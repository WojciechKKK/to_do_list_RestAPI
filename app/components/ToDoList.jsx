import React, { Component } from 'react'
import ToDoItem  from '../components/ToDoItem.jsx'
import NewToDoForm  from '../components/NewToDoForm.jsx'
import DeleteBtn from './DeleteBtn.jsx';
import DownloadList from "../components/DownloadList.jsx"


class ToDoList extends Component{
    constructor(props){
      super(props);
      this.state = {
        tasks: this.props.myTasks,
        element: '',
      }
    }
    //download tasks from Database - button
    downloadAllTask = () => {
      let actuallyList = [];
      fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(json => json.map(el => actuallyList.push(el)))
        .then(json => {
          this.setState({
            tasks: actuallyList
          });
          setTimeout(()=> {
            alert(`Downloaded ${json.length} tasks from the Database`)
          },300);
        })
        .catch(error => alert('Error -> RestAPI'));
      // console.log(actuallyList)
    }

    //delete state - button
    deleteState = () => {
      this.setState({
        tasks: []
      });
      // console.log('Deleted all tasks');
    }

    //state for input
    addToState = (e) => {
      this.setState({
        element: e.target.value
      })
    }

    //add new task
    addElement = () => {
      let newDate = new Date();
      let date = newDate.toString();
      let findGMT = date.search("G");
      let finalDate = date.slice(0,findGMT);
      const {element, tasks } = this.state;
      if(element != false){
        let allList = tasks;
        allList.push({
          name: element, 
          done: false,
          date: finalDate
          });
        this.setState({
        tasks: allList,
        element: '',
        })
      }
    }

    //for delete items
    deleteItem = (el) => {
      this.setState(({ tasks }) => ({
        tasks: tasks.filter(item => item !== el)
      }));
      // console.log('Task został usunięty');
      //delete from database if tasks is 'saved'
      if(el.saved == 'saved'){
        let idElement = el.id
        fetch(`http://localhost:3000/tasks/${idElement}`, {
          method: 'DELETE'});
        setTimeout(()=> {
            alert(`Task ${el.name} has been deleted from Database`)
            },300);
      } 
    }
    //function confirm question
    confirmQuestion = (question, makeFunction) => {
      let answerQuestion = confirm(question);
        if(answerQuestion == true){
          makeFunction()
        }
    }

    render(){
      const { tasks , element} = this.state;
      return(
        <div className="document">
          <header>
            <h1>
              {this.props.title}
            </h1>
          </header>
            {tasks.map(e => {
              return (
                <ToDoItem 
                  title={e} 
                  key={e.name} 
                  info={e.saved} 
                  numberId={e.id} 
                  element={e.name} 
                  done={e.done} 
                  date={e.date}
                  fnConfirm={this.confirmQuestion}
                  fnDelete={this.deleteItem} 
                />)
            })}
            <NewToDoForm 
              val={element}
              fnI={this.addToState} 
              fnC={this.addElement} 
            />
          <nav>
            <DeleteBtn 
              fnConfirm={this.confirmQuestion} 
              fnD={this.deleteState} 
            />
            <DownloadList 
              fnConfirm={this.confirmQuestion} 
              fnDownload={this.downloadAllTask} 
              fnDelete={this.deleteState} 
            />
          </nav>
        </div>
      )
    }
  }
  
 export default ToDoList
