import "./task.css"

export default function Task({taskData, onChangeStatus, onEdit, onDeleted}) {
  const {description, createdAt} = taskData

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        onClick={onChangeStatus}/>
      <label>
        <span className="description">{description}</span>
        <span className="created">{createdAt}</span>
      </label>
      <button onClick={onEdit} className="icon icon-edit"></button>
      <button onClick={onDeleted} className="icon icon-destroy"></button>
    </div>
  )
}