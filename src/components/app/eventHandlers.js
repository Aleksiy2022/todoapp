import { createTask } from './utils.js'

function handleChangeStatusTask(id, setFunc) {
  setFunc((curTasks) =>
    curTasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status, duration: 0 }
      }
      return task
    })
  )
}

function handleEditTask(id, value, setFunc) {
  setFunc((curTasks) =>
    curTasks.map((task) => {
      if (task.id === id) {
        return { ...task, description: value, editing: false }
      }
      return task
    })
  )
}

function handleAddNewTask(id, task, setFunc) {
  setFunc((curTasks) => curTasks.concat(createTask(id, task)))
}

function handleDeletedTask(id, setFunc) {
  setFunc((curTasks) => {
    const idx = curTasks.findIndex((el) => el.id === id)
    return curTasks.toSpliced(idx, 1)
  })
}

function handleDeleteCompletedTasks(setFunc) {
  setFunc((curTasks) => curTasks.filter((task) => !task.status))
}

function handleFilter(filter, setFunc) {
  setFunc(filter)
}

function handleChangeEditing(id, setFunc) {
  setFunc((curTasks) =>
    curTasks.map((task) => {
      if (task.id === id) {
        return { ...task, editing: true }
      }
      return task
    })
  )
}

export {
  handleChangeStatusTask,
  handleEditTask,
  handleAddNewTask,
  handleDeletedTask,
  handleDeleteCompletedTasks,
  handleFilter,
  handleChangeEditing,
}
