import { createContext, useState } from 'react'

import {
  addNewTask,
  changeEditing,
  changeStatusTask,
  deleteCompletedTasks,
  deletedTask,
  editTask,
  filter,
  resetEditing,
} from './eventHandlers.js'
import { getUndoneTasksCount, getTimeLeft } from './utils.js'

const TasksContext = createContext({})

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [tasksFilter, setFilter] = useState('all')
  const setStates = {
    setTasks,
    setFilter,
  }

  const handlers = {
    addNewTask,
    changeEditing,
    changeStatusTask,
    deleteCompletedTasks,
    deletedTask,
    editTask,
    filter,
    resetEditing,
  }

  const utils = {
    getUndoneTasksCount,
    getTimeLeft,
    resetEditing,
  }

  return (
    <TasksContext.Provider value={{ tasks, tasksFilter, setStates, handlers, utils }}>{children}</TasksContext.Provider>
  )
}

export { TasksContext, TasksProvider }
