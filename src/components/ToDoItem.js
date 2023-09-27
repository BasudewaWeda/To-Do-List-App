import "../styles/ToDoItem.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function ToDoItem(props) {

    const textStyle = {
        textDecoration: props.isDone ? "line-through" : "none",
        color: props.isDone ? "rgba(255, 255, 255, 0.8)" : "rgb(255,255,255)",
        fontWeight: props.isDone ? "400" : "700"
    }

    return (
        <div className="todoitem-wrapper">
            <p 
                className="todoitem-text" 
                style={textStyle}
                onClick={() => props.toggle(props.id)}
            >
                {props.toDoText}
            </p>
            <div className="todoitem-shift-button">
                <button onClick={() => props.shiftUp(props.id)}>
                    <FontAwesomeIcon icon={faArrowUp} className="arrow-up"/>
                </button>
                <button onClick={() => props.shiftDown(props.id)}>
                    <FontAwesomeIcon icon={faArrowDown} className="arrow-up"/>
                </button>
            </div>
            <button className="todoitem-button" onClick={() => props.delete(props.id)}>X</button>
        </div>
    )
}