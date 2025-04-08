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

export { createTask, getUndoneTasksCount }
