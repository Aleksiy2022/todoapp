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

function getTimeLeft(duration) {
  if (duration <= 0) {
    return '00:00'
  }
  const minute = new Date(duration).getMinutes().toString()
  const seconds = new Date(duration).getSeconds().toString()
  return `${minute.length === 2 ? minute : '0' + minute}:${seconds.length === 2 ? seconds : '0' + seconds}`
}

export { createTask, getUndoneTasksCount, getTimeLeft }
