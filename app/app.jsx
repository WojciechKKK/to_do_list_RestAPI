import ReactDOM from 'react-dom';
import React, { Component } from 'react'
import './styles/style.css'
import  ToDoList  from './components/ToDoList.jsx'

//tasks for exmpla
let myTask = [
  {name: 'task 1', done: false, "id": "1"},
  // {name: 'task 2', done: true, "id": "2"},
]

//header in app
let myTitle = 'My ToDo List'


const App = () => <ToDoList title={myTitle} myTasks={myTask} />

ReactDOM.render(
    <App />,
    document.getElementById('app')
)
