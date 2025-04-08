function createTask(id, task) {
  const currentDate = new Date()
  return {
    id: id,
    description: task.description,
    createdAt: currentDate.toISOString(),
    status: false,
    editing: false,
    duration: task.duration,
  }
}

function getUndoneTasksCount(data) {
  return data.filter((task) => !task.status).length
}

function resetEditing(currentTodoData) {
  const newTodoData = currentTodoData.map((task) => ({ ...task, editing: false }))
  if (currentTodoData.some((task, index) => task.editing !== newTodoData[index].editing)) {
    return newTodoData
  }
  return currentTodoData
}

export { createTask, getUndoneTasksCount, resetEditing }
