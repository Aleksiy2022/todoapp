import "./task.css"

export default function Task({taskData}) {

  const {id, statusClass, description, createdAt} = taskData
  const inputEl = <input type="text" className="edit" value="Editing task"/>

  return (
    <li className={statusClass} key={id}>
      <div className="view">
        <input className="toggle" type="checkbox"/>
        <label>
          <span className="description">{description}</span>
          <span className="created">{createdAt}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
        {statusClass === "editing" ? inputEl : null}
      </div>
    </li>
  )
}