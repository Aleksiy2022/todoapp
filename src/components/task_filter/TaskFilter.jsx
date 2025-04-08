import { useContext, memo } from 'react'

import { TasksHandlerContext, TasksFilterContext } from '../tasks_context/TasksContext.jsx'

const TaskFilter = memo(function TaskFilter() {
  const { changeFilter } = useContext(TasksHandlerContext)
  const { tasksFilter } = useContext(TasksFilterContext)

  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttons = buttonsData.map((btn) => {
    const isActive = tasksFilter === btn.name
    return (
      <li key={btn.name}>
        <button className={isActive ? 'selected' : ''} onClick={() => changeFilter(btn.name)}>
          {btn.label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttons}</ul>
})

export { TaskFilter }
