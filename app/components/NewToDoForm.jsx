import React, { Component } from 'react'

class NewToDoForm extends Component{
    constructor(props){
        super(props)
    }
    newAddToState = (e) =>{
        if(typeof this.props.fnI == 'function'){
            this.props.fnI(e)
        }
    }
    newAddElement = () =>{
        if(typeof this.props.fnC == 'function'){
            this.props.fnC()
        }
    }
    newEnterAddElement = (e) => {
        if(e.charCode == 13){
            this.newAddElement();
        }
    }
    render(){
        return (
            <div className="allInput">
                <input 
                    onKeyPress={this.newEnterAddElement}  //event na 'enter'
                    className="textInput" //style
                    onChange={this.newAddToState} //ustawia state
                    type="text" 
                    placeholder="Enter a new task"
                    value={this.props.val}> 
                    {/* // ^ pobiera z state to co wpisujemy  */}
                </input>
                <button className="buttonAdd" onClick={this.newAddElement} title="Press Enter or click here">
                    +
                </button>
            </div>
        )
    }
}
//albo wersja funkcyjna - w param przyjmuje propsy
// const NewToDoForm = ({fnI, val, fnC}) => {
//     return (
//         <div>
//             <input onChange={fnI} type="text" value={val}></input>
//             <button onClick={fnC}>Add</button>
//         </div>
//     )
// }

export default  NewToDoForm
