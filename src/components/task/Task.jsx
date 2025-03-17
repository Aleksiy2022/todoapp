import "./task.css"

export default function Task({taskData, onChangeStatus}) {
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
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  )
}