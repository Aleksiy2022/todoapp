import { v4 as uuidv4 } from 'uuid'
import { useCallback, useEffect, useState } from 'react'

import NewTaskForm from '../new_task_form/NewTaskForm.jsx'
import TaskList from '../task_list/TaskList.jsx'
import Footer from '../footer/Footer.jsx'

import {
  handleAddNewTask,
  handleChangeEditing,
  handleChangeStatusTask,
  handleDeleteCompletedTasks,
  handleDeletedTask,
  handleEditTask,
  handleFilter,
  handleResetEditing,
} from './eventHandlers.js'
import { getUndoneTasksCount } from './utils.js'

export default function App() {
  // console.log('Рендер приложения')
  // console.log('----------------------------------------------')
  const [todoData, setTodoData] = useState([])
  const [taskFilter, setTaskFilter] = useState('all')

  const memoizedHandleResetEditing = useCallback(handleResetEditing, [])

  useEffect(() => {
    function handleGlobalEvents(event) {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setTodoData(memoizedHandleResetEditing)
      }
      if (event.type === 'click' && !event.target.classList.value.includes('edit')) {
        setTodoData(memoizedHandleResetEditing)
      }
    }

    window.addEventListener('keydown', handleGlobalEvents)
    window.addEventListener('click', handleGlobalEvents)

    return () => {
      window.removeEventListener('keydown', handleGlobalEvents)
      window.removeEventListener('click', handleGlobalEvents)
    }
  }, [])

  return (
    <section className="todoapp">
      <NewTaskForm onAddNewTask={(task) => handleAddNewTask(uuidv4(), task, setTodoData)} />
      <section className="main">
        <TaskList
          tasks={{ todoData: todoData, taskFilter: taskFilter }}
          onChangeStatus={(id) => handleChangeStatusTask(id, setTodoData)}
          onEditTask={(id, value) => handleEditTask(id, value, setTodoData)}
          onDeleted={(id) => handleDeletedTask(id, setTodoData)}
          onChangeEditing={(id) => handleChangeEditing(id, setTodoData)}
        />
        <Footer
          onFilter={(filter) => handleFilter(filter, setTaskFilter)}
          filter={taskFilter}
          undoneTasksCount={getUndoneTasksCount(todoData)}
          onDeleteCompletedTasks={() => handleDeleteCompletedTasks(setTodoData)}
        />
      </section>
    </section>
  )
}
