import PropTypes from 'prop-types'

import Task from '../task/Task.jsx'

export default function TaskList({
  tasks = [],
  onChangeStatus = () => {},
  onEditTask = () => {},
  onDeleted = () => {},
  onStartTimer = () => {},
  onPauseTimer = () => {},
}) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onChangeStatus={onChangeStatus}
            onEditTask={onEditTask}
            onDeleted={onDeleted}
            onStartTimer={onStartTimer}
            onPauseTimer={onPauseTimer}
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
  onStartTimer: PropTypes.func,
  onPauseTimer: PropTypes.func,
}
