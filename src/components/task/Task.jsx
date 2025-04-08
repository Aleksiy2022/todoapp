import { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import DurationTimer from '../timer/DurationTimer.jsx'
import CreatedTimer from '../timer/CreatedTimer.jsx'
import { TasksContext } from '../tasks_context/TasksContext.jsx'

export default function Task({ task = {} }) {
  console.log('Рендер таски')
  console.log('----------------------------------------------')
  const [inputValue, setInputValue] = useState({})
  const { tasksFilter, handlers, setStates } = useContext(TasksContext)

  const { id, status, editing, description, createdAt, duration } = task

  const hiddenUncompleted = !status && tasksFilter === 'completed' ? 'hidden' : ''
  const hiddenInactive = status && tasksFilter === 'active' ? 'hidden' : ''

  function onDisplayEditForm() {
    handlers.changeEditing(id, setStates.setTasks)
    setInputValue({ ...inputValue, [id]: description })
  }

  function onChange(evt, id) {
    setInputValue({ ...inputValue, [id]: evt.target.value })
  }

  function onSubmit(evt, id) {
    evt.preventDefault()
    handlers.editTask(id, inputValue[id], setStates.setTasks)
    setInputValue({ ...inputValue, [id]: '' })
  }

  return (
    <li
      className={`${status ? 'completed' : editing ? 'editing' : ''} ${
        hiddenUncompleted ? hiddenUncompleted : hiddenInactive ? hiddenInactive : ''
      }`}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => handlers.changeStatusTask(id, setStates.setTasks)}
          checked={status}
        />
        <label>
          <span className="title">{description}</span>
          <span className="description">
            <DurationTimer duration={duration} status={status} />
          </span>
          <CreatedTimer createdAt={createdAt} />
        </label>
        <button onClick={onDisplayEditForm} className="icon icon-edit"></button>
        <button onClick={() => handlers.deletedTask(id, setStates.setTasks)} className="icon icon-destroy"></button>
      </div>
      <form onSubmit={(evt) => onSubmit(evt, id)}>
        <input
          type="text"
          className="edit hidden"
          onChange={(evt) => onChange(evt, id)}
          value={inputValue[id] || ''}
          autoFocus={true}
        />
      </form>
    </li>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    editing: PropTypes.bool,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
}
