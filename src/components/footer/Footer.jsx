import { useContext } from 'react'

import TaskFilter from '../task_filter/TaskFilter.jsx'
import { TasksContext } from '../tasks_context/TasksContext.jsx'

export default function Footer() {
  const { tasks, handlers, utils, setStates } = useContext(TasksContext)

  console.log('Рендер футера')
  console.log('----------------------------------------------')
  return (
    <footer className="footer">
      <span className="todo-count">{utils.getUndoneTasksCount(tasks)} items left</span>
      <TaskFilter />
      <button onClick={() => handlers.deleteCompletedTasks(setStates.setTasks)} className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}
