import "./new_task_form.css"
import {useState} from "react";

export default function NewTaskForm({onAddNewTask = () => {}}) {

  const [newTask, setNewTask] = useState("")

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddNewTask(newTask)
    setNewTask("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="header">
      <h1>Todos</h1>
      <input
        onChange={(evt) => {
          setNewTask(evt.target.value)
        }}
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTask}/>
    </form>
  )
}