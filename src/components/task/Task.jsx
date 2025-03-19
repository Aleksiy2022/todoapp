import "./task.css"
import {useState} from "react";

export default function Task({task, onChangeStatus, onEditTask, onDeleted}) {

  const [inputValue, setInputValue] = useState({});
  const [editing, setEditing] = useState({});

  const {id, status, description, createdAgo} = task

  function setStatesToDisplayEditForm() {
    setEditing({...editing, [id]: true})
    setInputValue({...inputValue, [id]: description})
  }

  function onChange(evt, id) {
    setInputValue({...inputValue, [id]: evt.target.value});
  }

  function onSubmit(evt, id) {
    evt.preventDefault()
    onEditTask(id, inputValue[id])

    setEditing({...editing, [id]: false})
    setInputValue({...inputValue, [id]: ""})
  }

  return (
    <li className={status ? "completed" : editing[id] ? "editing" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => onChangeStatus(id)}
          checked={status}/>
        <label>
          <span className="description">{description}</span>
          <span className="created">{createdAgo}</span>
        </label>
        <button
          onClick={setStatesToDisplayEditForm}
          className="icon icon-edit">
        </button>
        <button
          onClick={() => onDeleted(id)}
          className="icon icon-destroy">
        </button>
      </div>
      <form
        onSubmit={(evt) => onSubmit(evt, id)}>
        <input
          type="text"
          className="edit hidden"
          onChange={(evt) => onChange(evt, id)}
          value={inputValue[id]}/>
      </form>
    </li>
  )
}