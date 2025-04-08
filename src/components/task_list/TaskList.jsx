import { useContext } from 'react'

import Task from '../task/Task.jsx'
import { TasksContext } from '../tasks_context/TasksContext.jsx'

export default function TaskList() {
  console.log('Рендер списка задач')
  console.log('----------------------------------------------')

  const { tasks } = useContext(TasksContext)

  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />
      })}
    </ul>
  )
}
