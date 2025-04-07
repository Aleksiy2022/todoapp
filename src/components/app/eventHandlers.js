import { createTask } from './utils.js'

function handleChangeStatusTask(id, data, setFunc) {
  const updatedTodoData = data.map((elem) => {
    if (elem.id === id) {
      return { ...elem, status: !elem.status, duration: 0 }
    }
    return elem
  })
  setFunc(updatedTodoData)
}

function handleEditTask(id, value, data, setFunc) {
  const updatedTodoData = data.map((elem) => {
    if (elem.id === id) {
      return { ...elem, description: value, editing: false }
    }
    return elem
  })
  setFunc(updatedTodoData)
}

function handleAddNewTask(id, task, data, setFunc) {
  const newTask = createTask(id, task)
  setFunc(data.concat(newTask))
}

function handleDeletedTask(id, data, setFunc) {
  const idx = data.findIndex((el) => el.id === id)
  const updatedTodoData = data.toSpliced(idx, 1)
  setFunc(updatedTodoData)
}

function handleDeleteCompletedTasks(data, setFunc) {
  const updatedTodoData = data.filter((task) => !task.status)
  setFunc(updatedTodoData)
}

function handleFilter(filter, setFunc) {
  setFunc(filter)
}

function handleKeyDown(evt, id, data, setFunc) {
  if (evt.key === 'Escape') {
    const updatedTodoData = data.map((elem) => {
      if (elem.id === id) {
        return { ...elem, editing: false }
      }
      return elem
    })
    setFunc(updatedTodoData)
  }
}

function handleChangeEditing(id, data, setFunc) {
  const updatedTodoData = data.map((elem) => {
    if (elem.id === id) {
      return { ...elem, editing: true }
    }
    return elem
  })
  setFunc(updatedTodoData)
}

export {
  handleChangeStatusTask,
  handleEditTask,
  handleAddNewTask,
  handleDeletedTask,
  handleDeleteCompletedTasks,
  handleFilter,
  handleKeyDown,
  handleChangeEditing,
}
