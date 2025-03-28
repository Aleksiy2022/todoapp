import PropTypes from 'prop-types'

import Task from '../task/Task.jsx'

export default function TaskList({
  tasks = [],
  onChangeStatus = () => {},
  onEditTask = () => {},
  onDeleted = () => {},
  onChangeDuration = () => {},
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
            onChangeDuration={onChangeDuration}
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
