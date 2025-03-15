import "./task_list.css"
import Task from "../task/Task.jsx"

export default function TaskList({tasks}) {

  const elements = tasks.map(task => {
    return <Task taskData={task}/>
  })

  return (
    <ul className="todo-list">
      { elements }
    </ul>
  )
}