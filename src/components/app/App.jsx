import { useState } from 'react'

import NewTaskForm from '../new_task_form/NewTaskForm.jsx'
import TaskList from '../task_list/TaskList.jsx'
import Footer from '../footer/Footer.jsx'

let newId = 1

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [taskFilter, setFilter] = useState('all')

  function createTask(text) {
    const currentDate = new Date()
    return {
      statusClass: '',
      description: text,
      createdAt: currentDate.toISOString(),
      id: newId++,
      status: false,
      duration: 1000000,
    }
  }

  function handleChangeStatusTask(id) {
    const updatedTodoData = todoData.map((elem) => {
      if (elem.id === id) {
        return { ...elem, status: !elem.status }
      }
      return elem
    })
    setTodoData(updatedTodoData)
  }

  function handleEditTask(id, value) {
    const updatedTodoData = todoData.map((elem) => {
      if (elem.id === id) {
        return { ...elem, description: value }
      }
      return elem
    })
    setTodoData(updatedTodoData)
  }

  function handleAddNewTask(value) {
    const newTask = createTask(value)
    setTodoData(todoData.concat(newTask))
  }

  function handleDeletedTask(id) {
    const idx = todoData.findIndex((el) => el.id === id)
    const updatedTodoData = todoData.toSpliced(idx, 1)
    setTodoData(updatedTodoData)
  }

  function handleDeleteCompletedTasks() {
    const updatedTodoData = todoData.filter((task) => !task.status)
    setTodoData(updatedTodoData)
  }

  function handleFilter(filter) {
    setFilter(filter)
  }

  function handleChangeDuration(id, value) {
    const updatedTodoData = todoData.map((elem) => {
      if (elem.id === id) {
        return { ...elem, duration: value }
      }
      return elem
    })
    setTodoData(updatedTodoData)
  }

  function filteredTasks(filter) {
    switch (filter) {
      case 'all':
        return todoData
      case 'active':
        return todoData.filter((task) => task.status === false)
      case 'completed':
        return todoData.filter((task) => task.status)
    }
  }

  function undoneTasks() {
    return todoData.filter((task) => !task.status).length
  }

  return (
    <section className="todoapp">
      <NewTaskForm onAddNewTask={handleAddNewTask} />
      <section className="main">
        <TaskList
          tasks={filteredTasks(taskFilter)}
          onChangeStatus={handleChangeStatusTask}
          onEditTask={handleEditTask}
          onDeleted={handleDeletedTask}
          onChangeDuration={handleChangeDuration}
        />
        <Footer
          onFilter={handleFilter}
          filter={taskFilter}
          countUndoneTasks={undoneTasks()}
          onDeleteCompletedTasks={handleDeleteCompletedTasks}
        />
      </section>
    </section>
  )
}
