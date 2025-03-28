import { useState } from 'react'
import PropTypes from 'prop-types'

import DurationTimer from '../timer/DurationTimer.jsx'
import CreatedTimer from '../timer/CreatedTimer.jsx'

export default function Task({
  task = {},
  onChangeStatus = () => {},
  onEditTask = () => {},
  onDeleted = () => {},
  onChangeDuration = () => {},
}) {
  const [inputValue, setInputValue] = useState({})
  const [editing, setEditing] = useState({})

  const { id, status, description, createdAt, duration } = task

  function setStatesToDisplayEditForm() {
    setEditing({ ...editing, [id]: true })
    setInputValue({ ...inputValue, [id]: description })
  }

  function onChange(evt, id) {
    setInputValue({ ...inputValue, [id]: evt.target.value })
  }

  function onSubmit(evt, id) {
    evt.preventDefault()
    onEditTask(id, inputValue[id])

    setEditing({ ...editing, [id]: false })
    setInputValue({ ...inputValue, [id]: '' })
  }

  return (
    <li className={status ? 'completed' : editing[id] ? 'editing' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={() => onChangeStatus(id)} checked={status} />
        <label>
          <span className="title">{description}</span>
          <span className="description">
            <DurationTimer taskId={id} duration={duration} onChangeDuration={onChangeDuration} />
          </span>
          <CreatedTimer createdAt={createdAt} />
        </label>
        <button onClick={setStatesToDisplayEditForm} className="icon icon-edit"></button>
        <button onClick={() => onDeleted(id)} className="icon icon-destroy"></button>
      </div>
      <form onSubmit={(evt) => onSubmit(evt, id)}>
        <input type="text" className="edit hidden" onChange={(evt) => onChange(evt, id)} value={inputValue[id] || ''} />
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
