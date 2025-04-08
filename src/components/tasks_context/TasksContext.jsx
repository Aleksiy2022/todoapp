import { createContext, useState, useCallback, useMemo } from 'react'

const TasksContext = createContext({})
const TasksHandlerContext = createContext({})
const TasksFilterContext = createContext({})

function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [tasksFilter, setFilter] = useState('all')

  const createTask = useCallback((id, task) => {
    const currentDate = new Date()
    return {
      id: id,
      description: task.description,
      createdAt: currentDate.toISOString(),
      status: false,
      duration: task.duration,
    }
  }, [])

  const changeStatusTask = useCallback((id) => {
    setTasks((curTasks) =>
      curTasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: !task.status, duration: 0 }
        }
        return task
      })
    )
  }, [])

  const editTask = useCallback((id, value) => {
    setTasks((curTasks) =>
      curTasks.map((task) => {
        if (task.id === id) {
          return { ...task, description: value }
        }
        return task
      })
    )
  }, [])

  const addNewTask = useCallback((id, task) => {
    setTasks((curTasks) => curTasks.concat(createTask(id, task)))
  }, [])

  const deletedTask = useCallback((id) => {
    setTasks((curTasks) => {
      const idx = curTasks.findIndex((el) => el.id === id)
      return curTasks.toSpliced(idx, 1)
    })
  }, [])

  const deleteCompletedTasks = useCallback(() => {
    setTasks((curTasks) => curTasks.filter((task) => !task.status))
  }, [])

  const changeFilter = useCallback((filter) => setFilter(filter), [])

  const tasksData = useMemo(() => ({ tasks }), [tasks])
  const handlers = useMemo(
    () => ({
      addNewTask,
      changeStatusTask,
      deleteCompletedTasks,
      deletedTask,
      editTask,
      changeFilter,
    }),
    [addNewTask, changeStatusTask, deleteCompletedTasks, deletedTask, editTask, changeFilter, createTask]
  )
  const tasksFilterValue = useMemo(() => ({ tasksFilter }), [tasksFilter])

  return (
    <TasksContext.Provider value={tasksData}>
      <TasksHandlerContext.Provider value={handlers}>
        <TasksFilterContext value={tasksFilterValue}>{children}</TasksFilterContext>
      </TasksHandlerContext.Provider>
    </TasksContext.Provider>
  )
}

export { TasksContext, TasksHandlerContext, TasksFilterContext, TasksProvider }
