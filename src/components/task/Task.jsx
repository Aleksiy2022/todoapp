import { useState } from 'react'
import PropTypes from 'prop-types'

import DurationTimer from '../timer/DurationTimer.jsx'
import CreatedTimer from '../timer/CreatedTimer.jsx'

export default function Task({
  task = {},
  onChangeStatus = () => {},
  onEditTask = () => {},
  onDeleted = () => {},
  onStartTimer = () => {},
  onPauseTimer = () => {},
  onKeyDown = () => {},
  onChangeEditing = () => {},
}) {
  const [inputValue, setInputValue] = useState({})

  const { id, status, editing, description, createdAt, duration } = task

  function onDisplayEditForm() {
    onChangeEditing(id)
    setInputValue({ ...inputValue, [id]: description })
  }

  function onChange(evt, id) {
    setInputValue({ ...inputValue, [id]: evt.target.value })
  }

  function onSubmit(evt, id) {
    evt.preventDefault()
    onEditTask(id, inputValue[id])
    setInputValue({ ...inputValue, [id]: '' })
  }

  return (
    <li className={status ? 'completed' : editing ? 'editing' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={() => onChangeStatus(id)} checked={status} />
        <label>
          <span className="title">{description}</span>
          <span className="description">
            <DurationTimer
              duration={duration}
              onStartTimer={() => onStartTimer(id)}
              onPauseTimer={() => onPauseTimer(id)}
            />
          </span>
          <CreatedTimer createdAt={createdAt} />
        </label>
        <button onClick={onDisplayEditForm} className="icon icon-edit"></button>
        <button onClick={() => onDeleted(id)} className="icon icon-destroy"></button>
      </div>
      <form onSubmit={(evt) => onSubmit(evt, id)}>
        <input
          onKeyDown={(evt) => onKeyDown(evt, id)}
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
  task: PropTypes.object.isRequired,
  onChangeStatus: PropTypes.func,
  onEditTask: PropTypes.func,
  onDeleted: PropTypes.func,
}
