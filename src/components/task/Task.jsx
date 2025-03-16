import "./task.css"

export default function Task({taskData}) {

  const {description, createdAt} = taskData
  return (
    <div className="view">
      <input className="toggle" type="checkbox"/>
      <label>
        <span className="description">{description}</span>
        <span className="created">{createdAt}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  )
}