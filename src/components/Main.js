import React from "react"
import ToDoItem from "./ToDoItem"
import { nanoid } from "nanoid"

import checkedBox from "../images/Checked CheckBox.png"
import unCheckedBox from "../images/Unchecked CheckBox.png"

import "../styles/Main.css"

export default function Main() {
    const [newItemObj, setNewItemObj] = React.useState({
        text: "",
        autoErase: true
    })
    const [toDoItem, setToDoItem] = React.useState(() => JSON.parse(localStorage.getItem("todoitem")) || [])

    const toDoElements = toDoItem.map(item => <ToDoItem 
        toDoText={item.text} 
        isDone={item.isDone} 
        toggle={toggleItem}
        delete={deleteItem}
        shiftUp={shiftItemUp}
        shiftDown={shiftItemDown}
        id={item.id}
        key={item.id}
        />
    )

    React.useEffect(() => localStorage.setItem("todoitem", JSON.stringify(toDoItem)), [toDoItem])

    function addNewItem() {
        if(newItemObj.text) {
            setToDoItem(prevState => [
                {
                    text: newItemObj.text,
                    isDone: false,
                    id: nanoid()
                },
                ...prevState
            ])
            setNewItemObj(prevState => newItemObj.autoErase ? {...prevState, text:""} : prevState)
        }
    }

    function toggleItem(id) {
        setToDoItem(prevState => {
            const newState = prevState.map(item => item.id === id ? {...item, isDone: !item.isDone} : item)
            return [...newState.filter(item => item.id !== id), newState.find(item => item.id === id)]
        })
    }

    function deleteItem(id) {
        setToDoItem(prevState => (
            prevState.filter(item => item.id !== id)
        ))
    }

    function shiftItemUp(id, name) {
        const indexCheck = toDoItem.findIndex(object => object.id === id)
        console.log(name);
        if(indexCheck > 0) {
            setToDoItem(prevState => {
                let newState = [...prevState]
                let temp = newState[indexCheck]
                newState[indexCheck] = newState[indexCheck - 1]
                newState[indexCheck - 1] = temp
                return newState
            })
        }
    }

    function shiftItemDown(id) {
        const indexCheck = toDoItem.findIndex(object => object.id === id)
        if(indexCheck < toDoItem.length - 1) {
            setToDoItem(prevState => {
                let newState = [...prevState]
                let temp = newState[indexCheck]
                newState[indexCheck] = newState[indexCheck + 1]
                newState[indexCheck + 1] = temp
                return newState
            })
        }
    }

    function handleInputChange(event) {
        setNewItemObj(prevState => ({...prevState, text: event.target.value}))
    }

    function toggleCheckBox() {
        setNewItemObj(prevState => ({...prevState, autoErase: !prevState.autoErase}))
    }

    function handleKeyDown(event) {
        if(event.key === "Enter") addNewItem()
    }

    return (
        <main className="main-wrapper">
            {!toDoElements.length && <div className="placeholder-wrapper">Add some to-do items!</div>}
            <div className="progress-wrapper">
                <p>PROGRESS</p>
                <p>{toDoItem.filter(item => item.isDone).length} / {toDoItem.length}</p>
            </div>
            <div className="item-wrapper">
                {toDoElements}
            </div>
            <div className="input-wrapper">
                <input 
                    type="text" 
                    value={newItemObj.text}
                    placeholder="To-Do Item Name"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="input-text"
                />
                <button onClick={addNewItem}>+</button>
                <div className="checkbox-wrapper" onClick={toggleCheckBox}>
                    <img src={newItemObj.autoErase ? checkedBox : unCheckedBox}/>
                    <p>Auto Erase</p>
                </div>
            </div>
        </main>
    )
}