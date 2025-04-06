function createTask(id, task) {
  const currentDate = new Date()
  const currentTime = Date.now()
  return {
    description: task.description,
    createdAt: currentDate.toISOString(),
    id: id,
    status: false,
    editing: false,
    duration: task.duration,
    timerStatus: true,
    startTimer: currentTime,
    endTimer: currentTime + task.duration,
  }
}

function getFilteredTasks(filter, data) {
  switch (filter) {
    case 'all':
      return data
    case 'active':
      return data.filter((task) => task.status === false)
    case 'completed':
      return data.filter((task) => task.status)
  }
}

function getUndoneTasksCount(data) {
  return data.filter((task) => !task.status).length
}

export { createTask, getFilteredTasks, getUndoneTasksCount }
