import { useState } from 'react'
import PropTypes from 'prop-types'

export default function NewTaskForm({ onAddNewTask = () => {} }) {
  const [newTask, setNewTask] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  function handleSubmit(evt) {
    evt.preventDefault()

    const duration = calculateDuration(minutes, seconds)
    onAddNewTask({
      description: newTask,
      duration: duration,
    })
    setNewTask('')
    setMinutes('')
    setSeconds('')
  }

  function handleInput(evt) {
    const elemName = evt.target.name
    const elemValue = evt.target.value
    switch (elemName) {
      case 'newTask':
        setNewTask(elemValue)
        break
      case 'min':
        setMinutes(elemValue)
        break
      case 'sec':
        setSeconds(elemValue)
        break
    }
  }

  function calculateDuration(min, sec) {
    const minToMillisec = min * 60000
    const secToMillisec = sec ? sec * 1000 : 0
    return minToMillisec + secToMillisec
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form onSubmit={handleSubmit} className="new-todo-form">
        <input
          name="newTask"
          onChange={handleInput}
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTask}
          required
          autoFocus
        />
        <input
          name="min"
          onChange={handleInput}
          className="new-todo-form__timer"
          placeholder="Min"
          value={minutes}
          required
        />
        <input name="sec" onChange={handleInput} className="new-todo-form__timer" placeholder="Sec" value={seconds} />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onAddNewTask: PropTypes.func,
}
