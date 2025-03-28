import { useState } from 'react'
import PropTypes from 'prop-types'

export default function NewTaskForm({ onAddNewTask = () => {} }) {
  const [newTask, setNewTask] = useState('')

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddNewTask(newTask)
    setNewTask('')
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form onSubmit={handleSubmit} className="new-todo-form">
        <input
          onChange={(evt) => {
            setNewTask(evt.target.value)
          }}
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTask}
        />
        <input className="new-todo-form__timer" placeholder="Min" autoFocus />
        <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onAddNewTask: PropTypes.func,
}
