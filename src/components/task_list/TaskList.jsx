import './task_list.css'
import PropTypes from 'prop-types'

import Task from '../task/Task.jsx'

export default function TaskList({
  tasks = [],
  onChangeStatus = () => {},
  onEditTask = () => {},
  onDeleted = () => {},
}) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onChangeStatus={(id) => onChangeStatus(id)}
            onEditTask={(id, value) => onEditTask(id, value)}
            onDeleted={(id) => onDeleted(id)}
          />
        )
      })}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onChangeStatus: PropTypes.func,
  onEditTask: PropTypes.func,
  onDeleted: PropTypes.func,
}
