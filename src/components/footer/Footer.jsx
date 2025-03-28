import './footer.css'
import PropTypes from 'prop-types'

import TaskFilter from '../task_filter/TaskFilter.jsx'

export default function Footer({
  onFilter = () => {},
  filter = 'all',
  countUndoneTasks = 0,
  onDeleteCompletedTasks = () => {},
}) {
  return (
    <footer className="footer">
      <span className="todo-count">{countUndoneTasks} items left</span>
      <TaskFilter onFilter={(value) => onFilter(value)} filter={filter} />
      <button onClick={onDeleteCompletedTasks} className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  onFilter: PropTypes.func,
  filter: PropTypes.string,
  countUndoneTasks: PropTypes.number,
  onDeleteCompletedTasks: PropTypes.func,
}
