import NewTaskForm from '../new_task_form/NewTaskForm.jsx'
import TaskList from '../task_list/TaskList.jsx'
import Footer from "../footer/Footer.jsx"
import {useState, useEffect} from 'react'
import "./app.css"
import {formatDistanceToNow} from 'date-fns'

let newId = 1

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [taskFilter, setFilter] = useState("all")

  const updateInterval = 5000

  useEffect(() => {
    const timerId = setInterval(() => {
      const copyTodoData = JSON.parse(JSON.stringify(todoData))
      const updatedTodoData = copyTodoData.map(task => {
        return {
          ...task,
          createdAgo: `created ${formatDistanceToNow(new
          Date(task.createdAt), {includeSeconds: true})} ago`
        }
      })
      setTodoData(updatedTodoData)
    }, updateInterval)
    return () => {
      clearInterval(timerId)
    }
  }, [todoData])

  function createTask(text) {
    const currentDate = new Date()
    return {
      statusClass: "",
      description: text,
      createdAt: currentDate.toISOString(),
      createdAgo: `created ${formatDistanceToNow(
        currentDate.toISOString(),
        {includeSeconds: true}
      )} ago`,
      id: newId++,
      status: false
    }
  }

  function handleChangeStatusTask(id) {
    const updatedTodoData = todoData.map(elem => {
      if (elem.id === id) {
        return {...elem, status: !elem.status};
      }
      return elem
    })
    setTodoData(updatedTodoData)
  }

  function handleEditTask(id, value) {
    const updatedTodoData = todoData.map(elem => {
      if (elem.id === id) {
        return {...elem, description: value}
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
    const idx = todoData.findIndex(el => el.id === id)
    const updatedTodoData = todoData.toSpliced(idx, 1)
    setTodoData(updatedTodoData)
  }

  function handleDeleteCompletedTasks() {
    const updatedTodoData = todoData.filter(task => !task.status)
    setTodoData(updatedTodoData)
  }

  function handleFilter(filter) {
    setFilter(filter)
  }

  function filteredTasks(filter) {
    switch (filter) {
      case "all":
        return todoData
      case "active":
        return todoData.filter(task => task.status === false)
      case "completed":
        return todoData.filter(task => task.status)
    }
  }

  function undoneTasks() {
    return todoData.filter(task => !task.status).length
  }

  return (
    <section className="todoapp">
      <NewTaskForm onAddNewTask={handleAddNewTask}/>
      <section className="main">
        <TaskList
          tasks={filteredTasks(taskFilter)}
          onChangeStatus={handleChangeStatusTask}
          onEditTask={handleEditTask}
          onDeleted={handleDeletedTask}/>
        <Footer
          onFilter={handleFilter}
          filter={taskFilter}
          countUndoneTasks={undoneTasks()}
          onDeleteCompletedTasks={handleDeleteCompletedTasks}/>
      </section>
    </section>
  )
}