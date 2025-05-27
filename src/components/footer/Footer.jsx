import { useContext } from 'react'

import { TaskFilter } from '../task_filter/TaskFilter.jsx'
import { TasksContext, TasksHandlerContext } from '../tasks_context/TasksContext.jsx'

import { getUndoneTasksCount } from './utils.js'

export default function Footer() {
  const { deleteCompletedTasks } = useContext(TasksHandlerContext)
  const { tasks } = useContext(TasksContext)

  return (
    <footer className="footer">
      <span className="todo-count">{getUndoneTasksCount(tasks)} items left</span>
      <TaskFilter />
      <button onClick={deleteCompletedTasks} className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}
