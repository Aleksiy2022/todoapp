import PropTypes from 'prop-types'
import { useContext } from 'react'

import { TasksContext } from '../tasks_context/TasksContext.jsx'

export default function TaskFilter() {
  console.log('Рендер фильтра')
  console.log('----------------------------------------------')

  const { tasksFilter, setStates } = useContext(TasksContext)

  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttons = buttonsData.map((btn) => {
    const isActive = tasksFilter === btn.name
    return (
      <li key={btn.name}>
        <button className={isActive ? 'selected' : ''} onClick={() => setStates.setFilter(btn.name)}>
          {btn.label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttons}</ul>
}

TaskFilter.propTypes = {
  onFilter: PropTypes.func,
  filter: PropTypes.string,
}
