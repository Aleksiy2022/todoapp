import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'

import NewTaskForm from '../new_task_form/NewTaskForm.jsx'
import TaskList from '../task_list/TaskList.jsx'
import Footer from '../footer/Footer.jsx'

import {
  handleChangeStatusTask,
  handleEditTask,
  handleAddNewTask,
  handleDeletedTask,
  handleDeleteCompletedTasks,
  handleFilter,
} from './eventHandlers.js'
import { getFilteredTasks, getUndoneTasksCount } from './utils.js'

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [taskFilter, setFilter] = useState('all')

  function handleChangeDuration(id, value) {
    const updatedTodoData = todoData.map((elem) => {
      if (elem.id === id) {
        return { ...elem, duration: value }
      }
      return elem
    })
    setTodoData(updatedTodoData)
  }

  return (
    <section className="todoapp">
      <NewTaskForm onAddNewTask={(task) => handleAddNewTask(uuidv4(), task, todoData, setTodoData)} />
      <section className="main">
        <TaskList
          tasks={getFilteredTasks(taskFilter, todoData)}
          onChangeStatus={(id) => handleChangeStatusTask(id, todoData, setTodoData)}
          onEditTask={(id, value) => handleEditTask(id, value, todoData, setTodoData)}
          onDeleted={(id) => handleDeletedTask(id, todoData, setTodoData)}
          onChangeDuration={handleChangeDuration}
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
