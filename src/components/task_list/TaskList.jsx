import "./task_list.css"
import Task from "../task/Task.jsx"
import {useState} from 'react';

export default function TaskList({tasks, onChangeStatus, onDisplayEditTaskForm, onUpdateTask, onDeleted}) {

  const [inputValue, setInputValue] = useState("");

  function onChange(evt) {
    setInputValue(evt.target.value);
  }

  function onSubmit(evt, id) {
    evt.preventDefault()
    onUpdateTask(inputValue, id)
    setInputValue("");
  }

  function onEdit(evt, description, id) {
    setInputValue(description);
    onDisplayEditTaskForm(evt, id)
  }

  const elements = tasks.map((task) => {
    const {id, statusClass, ...taskItems} = task
    return (
      <li key={id} className={statusClass}>
        <Task
          taskData={taskItems}
          onChangeStatus={() => onChangeStatus(id)}
          onEdit={(evt,description) => onEdit(evt, description, id)}
          onDeleted={() => onDeleted(id)}/>
        <form
          onSubmit={(evt) => onSubmit(evt, id)}>
          <input
            type="text"
            className="edit hidden"
            onChange={onChange}
            value={inputValue}/>
        </form>
      </li>
    )
  })

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  )
}