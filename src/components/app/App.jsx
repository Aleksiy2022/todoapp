import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'

import NewTaskForm from '../new_task_form/NewTaskForm.jsx'
import TaskList from '../task_list/TaskList.jsx'
import Footer from '../footer/Footer.jsx'

import {
  handleAddNewTask,
  handleChangeStatusTask,
  handleDeleteCompletedTasks,
  handleDeletedTask,
  handleEditTask,
  handleFilter,
  handlePauseTimer,
  handleStartTimer,
  handleKeyDown,
  handleChangeEditing,
} from './eventHandlers.js'
import { getFilteredTasks, getUndoneTasksCount } from './utils.js'

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [taskFilter, setFilter] = useState('all')

  useEffect(() => {
    const timers = todoData.map((task) => {
      if (task.timerStatus && task.duration > 0) {
        return setInterval(() => {
          setTodoData((currentTodoData) =>
            currentTodoData.map((elem) => {
              if (elem.id === task.id && elem.duration > 0) {
                return { ...elem, duration: elem.endTimer - Date.now() }
              }
              return elem
            })
          )
        }, 100)
      }
    })
    return () => {
      timers.forEach((timerId) => {
        if (timerId) clearInterval(timerId)
      })
    }
  }, [todoData])

  useEffect(() => {
    function handleGlobalEvents(event) {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setTodoData((currentTodoData) => currentTodoData.map((task) => ({ ...task, editing: false })))
      }
      if (event.type === 'click' && !event.target.classList.value.includes('edit')) {
        setTodoData((currentTodoData) => currentTodoData.map((task) => ({ ...task, editing: false })))
      }
    }

    // Подписка на события
    window.addEventListener('keydown', handleGlobalEvents)
    window.addEventListener('click', handleGlobalEvents)

    // Удаление событий при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleGlobalEvents)
      window.removeEventListener('click', handleGlobalEvents)
    }
  }, [todoData])

  return (
    <section className="todoapp">
      <NewTaskForm onAddNewTask={(task) => handleAddNewTask(uuidv4(), task, todoData, setTodoData)} />
      <section className="main">
        <TaskList
          tasks={getFilteredTasks(taskFilter, todoData)}
          onChangeStatus={(id) => handleChangeStatusTask(id, todoData, setTodoData)}
          onEditTask={(id, value) => handleEditTask(id, value, todoData, setTodoData)}
          onDeleted={(id) => handleDeletedTask(id, todoData, setTodoData)}
          onStartTimer={(id) => handleStartTimer(id, todoData, setTodoData)}
          onPauseTimer={(id) => handlePauseTimer(id, todoData, setTodoData)}
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
