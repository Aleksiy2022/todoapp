import PropTypes from 'prop-types'

import Task from '../task/Task.jsx'

export default function TaskList({
  tasks = [],
  onChangeStatus = () => {},
  onEditTask = () => {},
  onDeleted = () => {},
  onChangeEditing = () => {},
}) {
  console.log('Рендер списка задач')
  console.log('----------------------------------------------')
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
            onChangeEditing={onChangeEditing}
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
  onKeyDown: PropTypes.func,
  onChangeEditing: PropTypes.func,
}
