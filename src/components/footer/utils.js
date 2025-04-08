function getUndoneTasksCount(tasks) {
  return tasks.filter((task) => !task.status).length
}

export { getUndoneTasksCount }
