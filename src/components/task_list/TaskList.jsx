import "./task_list.css"
import Task from "../task/Task.jsx"

export default function TaskList({ tasks , onChangeStatus}) {
  const inputEl = <input type="text" className="edit" value="Editing task" />

  const elements = tasks.map((task) => {
    const { id, statusClass, ...taskItems } = task
    const isEdit = statusClass === "editing"
    return (
      <li key={id} className={statusClass}>
        <Task 
          taskData={taskItems} 
          isEdit={isEdit} 
          onChangeStatus={ () => onChangeStatus(id) }/>
        {isEdit ? inputEl : null}
      </li>
    )
  })

  return (
    <ul className="todo-list">
      {elements}
    </ul>
  )
}