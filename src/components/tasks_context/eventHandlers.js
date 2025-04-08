import { createTask } from './utils.js'

function changeStatusTask(id, setFunc) {
  setFunc((curTasks) =>
    curTasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status, duration: 0 }
      }
      return task
    })
  )
}

function editTask(id, value, setFunc) {
  setFunc((curTasks) =>
    curTasks.map((task) => {
      if (task.id === id) {
        return { ...task, description: value, editing: false }
      }
      return task
    })
  )
}

function addNewTask(id, task, setFunc) {
  setFunc((curTasks) => curTasks.concat(createTask(id, task)))
}

function deletedTask(id, setFunc) {
  setFunc((curTasks) => {
    const idx = curTasks.findIndex((el) => el.id === id)
    return curTasks.toSpliced(idx, 1)
  })
}

function deleteCompletedTasks(setFunc) {
  setFunc((curTasks) => curTasks.filter((task) => !task.status))
}

function filter(filter, setFunc) {
  setFunc(filter)
}

function changeEditing(id, setFunc) {
  setFunc((curTasks) =>
    curTasks.map((task) => {
      if (task.id === id) {
        return { ...task, editing: true }
      }
      return task
    })
  )
}

function resetEditing(currentTodoData) {
  const newTodoData = currentTodoData.map((task) => ({ ...task, editing: false }))
  if (currentTodoData.some((task, index) => task.editing !== newTodoData[index].editing)) {
    return newTodoData
  }
  return currentTodoData
}

export {
  changeStatusTask,
  editTask,
  addNewTask,
  deletedTask,
  deleteCompletedTasks,
  filter,
  changeEditing,
  resetEditing,
}
