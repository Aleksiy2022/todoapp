import { useState } from 'react'
import PropTypes from 'prop-types'

import DurationTimer from '../timer/DurationTimer.jsx'
import CreatedTimer from '../timer/CreatedTimer.jsx'

export default function Task({
  task = {},
  filter,
  onChangeStatus = () => {},
  onEditTask = () => {},
  onDeleted = () => {},
  onChangeEditing = () => {},
}) {
  // console.log('Рендер таски')
  // console.log('----------------------------------------------')
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

  const hiddenUncompleted = !status && filter === 'completed' ? 'hidden' : ''
  const hiddenUnactive = status && filter === 'active' ? 'hidden' : ''

  return (
    <li
      className={`${status ? 'completed' : editing ? 'editing' : ''} ${
        hiddenUncompleted ? hiddenUncompleted : hiddenUnactive ? hiddenUnactive : ''
      }`}
    >
      <div className="view">
        <input className="toggle" type="checkbox" onChange={() => onChangeStatus(id)} checked={status} />
        <label>
          <span className="title">{description}</span>
          <span className="description">
            <DurationTimer duration={duration} status={status} />
          </span>
          <CreatedTimer createdAt={createdAt} />
        </label>
        <button onClick={onDisplayEditForm} className="icon icon-edit"></button>
        <button onClick={() => onDeleted(id)} className="icon icon-destroy"></button>
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
  task: PropTypes.object.isRequired,
  onChangeStatus: PropTypes.func,
  onEditTask: PropTypes.func,
  onDeleted: PropTypes.func,
  onKeyDown: PropTypes.func,
  onChangeEditing: PropTypes.func,
}
