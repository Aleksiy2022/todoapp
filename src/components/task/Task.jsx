import { useState, useContext, useEffect, memo } from 'react'
import PropTypes from 'prop-types'

import DurationTimer from '../timer/DurationTimer.jsx'
import CreatedTimer from '../timer/CreatedTimer.jsx'
import { TasksHandlerContext, TasksFilterContext } from '../tasks_context/TasksContext.jsx'

const Task = memo(function Task({ task = {} }) {
  const [inputValue, setInputValue] = useState({})
  const [editing, setEditing] = useState(false)

  const { editTask, changeStatusTask, deletedTask } = useContext(TasksHandlerContext)
  const { tasksFilter } = useContext(TasksFilterContext)

  const { id, status, description, createdAt, duration } = task

  const hiddenUncompleted = !status && tasksFilter === 'completed' ? 'hidden' : ''
  const hiddenInactive = status && tasksFilter === 'active' ? 'hidden' : ''

  useEffect(() => {
    function handleGlobalEvents(event) {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setEditing(false)
      }
      if (event.type === 'click' && !event.target.classList.value.includes('edit')) {
        setEditing(false)
      }
    }
    window.addEventListener('keydown', handleGlobalEvents)
    window.addEventListener('click', handleGlobalEvents)
    return () => {
      window.removeEventListener('keydown', handleGlobalEvents)
      window.removeEventListener('click', handleGlobalEvents)
    }
  }, [])

  function onDisplayEditForm() {
    setEditing(true)
    setInputValue({ ...inputValue, [id]: description })
  }

  function onChange(evt, id) {
    setInputValue({ ...inputValue, [id]: evt.target.value })
  }

  function onSubmit(evt, id) {
    evt.preventDefault()
    editTask(id, inputValue[id])
    setInputValue({ ...inputValue, [id]: '' })
    setEditing(false)
  }

  return (
    <li
      className={`${status ? 'completed' : editing ? 'editing' : ''} ${
        hiddenUncompleted ? hiddenUncompleted : hiddenInactive ? hiddenInactive : ''
      }`}
    >
      <div className="view">
        <input className="toggle" type="checkbox" onChange={() => changeStatusTask(id)} checked={status} />
        <label>
          <span className="title">{description}</span>
          <span className="description">
            <DurationTimer duration={duration} status={status} />
          </span>
          <CreatedTimer createdAt={createdAt} />
        </label>
        <button onClick={onDisplayEditForm} className="icon icon-edit"></button>
        <button onClick={() => deletedTask(id)} className="icon icon-destroy"></button>
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
})

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
}

export { Task }
