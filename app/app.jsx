import ReactDOM from 'react-dom';
import React, { Component } from 'react'
import './styles/style.css'
import  ToDoList  from './components/ToDoList.jsx'

//tasks for exmple
let myTask = [
  // {name: 'task 1', done: false},
]

//header in app
let myTitle = 'My ToDo List'


const App = () => <ToDoList title={myTitle} myTasks={myTask} />

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
