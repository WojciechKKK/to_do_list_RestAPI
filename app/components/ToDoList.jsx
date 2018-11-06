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
    //pobiera taski z bazy -button
    downloadAllTask = () => {
      let actuallyList = this.state.tasks;
      fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(json => {
          json.map(el => actuallyList.push(el));
          json.map(el => console.log(el.id));
          setTimeout(()=> {
            alert(`Downloaded tasks from document: ${json.length}`)
          },500);
          console.log(actuallyList)
          this.setState({
            tasks: actuallyList
          })
        })
        .catch(error => alert('Brak połączenia z bazą danych -> RestAPI'))
    }

    //usuwa state -button
    deleteState = () => {
      this.setState({
        tasks: []
      });
      console.log('Deleted all tasks');
    }

    //ustawia state
    addToState = (e) => {
      this.setState({
        element: e.target.value
      })
    }
    //dodaje element
    addElement = () => {
      const {element, tasks, counter} = this.state;
      if(element != false){
        let allList = tasks;
        allList.push({
          name: element, 
          done: false,
        });
        this.setState({
        tasks: allList,
        element: '',
        })
      }
    }

    
    deleteItem = indexToDelete => {
      this.setState(({ tasks }) => ({
        tasks: tasks.filter((element, index) => index !== indexToDelete)
      }));
      console.log('Taksk został usunięty')
    };
    // deleteItem={this.deleteItem.bind(this,key)}

    render(){
      const { tasks , element} = this.state;
      return(
        <div className="document">
          <header>
            <h1>
              {this.props.title}
            </h1>
          </header>
          {tasks.map((e,key) => <ToDoItem key={e.name} element={e.name} done={e.done}  deleteItem={this.deleteItem.bind(this,key)} />)}
          <NewToDoForm 
            fnI={this.addToState} 
            val={element}
            fnC={this.addElement} />
          <nav>
            <DeleteBtn fnD={this.deleteState} />
            <DownloadList fnDownload={this.downloadAllTask} fnDelete={this.deleteState} />
          </nav>
        </div>
      )
    }
  }
  
 export default ToDoList
