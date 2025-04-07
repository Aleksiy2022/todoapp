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
  handleKeyDown,
} from './eventHandlers.js'
import { getFilteredTasks, getUndoneTasksCount, resetEditing } from './utils.js'

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [taskFilter, setFilter] = useState('all')

  const memoizedResetEditing = useCallback(resetEditing, [])

  useEffect(() => {
    function handleGlobalEvents(event) {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setTodoData(memoizedResetEditing)
      }
      if (event.type === 'click' && !event.target.classList.value.includes('edit')) {
        setTodoData(memoizedResetEditing)
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
      <NewTaskForm onAddNewTask={(task) => handleAddNewTask(uuidv4(), task, todoData, setTodoData)} />
      <section className="main">
        <TaskList
          tasks={getFilteredTasks(taskFilter, todoData)}
          onChangeStatus={(id) => handleChangeStatusTask(id, todoData, setTodoData)}
          onEditTask={(id, value) => handleEditTask(id, value, todoData, setTodoData)}
          onDeleted={(id) => handleDeletedTask(id, todoData, setTodoData)}
          onKeyDown={(evt, id) => handleKeyDown(evt, id, todoData, setTodoData)}
          onChangeEditing={(id) => handleChangeEditing(id, todoData, setTodoData)}
        />
        <Footer
          onFilter={(filter) => handleFilter(filter, setFilter)}
          filter={taskFilter}
          undoneTasksCount={getUndoneTasksCount(todoData)}
          onDeleteCompletedTasks={() => handleDeleteCompletedTasks(todoData, setTodoData)}
        />
      </section>
    </section>
  )
}
