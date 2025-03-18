import "./new_task_form.css"
import {useState} from "react";

export default function NewTaskForm({onAddNewTask}) {

  const [newTask, setNewTask] = useState("")
  const [createdAt, setCreatedAt] = useState("")

  function onSubmit(evt) {
    evt.preventDefault()
    setCreatedAt("created 100 seconds ago")
    onAddNewTask(newTask, createdAt)
    setNewTask("")
  }

  function onChange(evt) {
    evt.preventDefault()
    setNewTask(evt.target.value)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="header">
      <h1>Todos</h1>
      <input
        onChange={(evt) => onChange(evt)}
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTask}/>
    </form>
  )
}