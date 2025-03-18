import NewTaskForm from '../new_task_form/NewTaskForm.jsx'
import TaskList from '../task_list/TaskList.jsx'
import Footer from "../footer/Footer.jsx";
import {useState, useEffect} from 'react';
import "./app.css"
import { formatDistanceToNow } from 'date-fns'

let maxId = 1

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const timerId = setInterval(() => {
      const updatedTodoData = todoData.map(task => {
        return {
          ...task,
          createdAgo: `created ${formatDistanceToNow(new
          Date(task.createdAt), { includeSeconds: true })} ago`
        }
      })
      setTodoData(updatedTodoData)
    }, 1000)
    return () => {
      clearInterval(timerId)
    }
  }, [todoData])

  function createTask(value) {
    const currentDate = new Date()
    return {
      statusClass: "",
      description: value,
      createdAt: currentDate.toISOString(),
      createdAgo: `created ${formatDistanceToNow(
        currentDate.toISOString(),
        {includeSeconds: true}
      )} ago`,
      id: maxId++,
      done: false
    }
  }

  function handleChangeStatusTask(id) {
    const updatedTodoData = todoData.map(elem => {
      if (elem.id === id) {
        elem.statusClass === "" ? elem.statusClass = "completed" : elem.statusClass = ""
        elem.done = !elem.done
        return elem
      } else return elem
    })
    setTodoData(updatedTodoData)
  }

  function handleDisplayEditingTaskForm(evt, id) {
    const updatedTodoData = todoData.map(elem => {
      if (elem.id === id) {
        if (elem.statusClass.includes("completed")) {
          return elem
        }
        elem.statusClass += " editing"
        return elem
      } else return elem
    })
    setTodoData(updatedTodoData)
  }

  function handleUpdateTask(value, id) {
    const updatedTodoData = todoData.map(elem => {
      if (elem.id === id) {
        elem.description = value
        elem.statusClass = ""
        return elem
      } else return elem
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
    const updatedTodoData = todoData.filter(task => !task.done)
    setTodoData(updatedTodoData)
  }

  function handleFilter(filter) {
    setFilter(filter)
  }

  function filteredTasks(filter) {
    switch(filter) {
      case "all":
        return todoData
      case "active":
        return todoData.filter(task => !task.done)
      case "completed":
        return todoData.filter(task => task.done)
    }
  }

  function undoneTasks() {
    return todoData.filter(task => !task.done).length
  }

  return (
    <section className="todoapp">
      <NewTaskForm onAddNewTask={handleAddNewTask}/>
      <section className="main">
        <TaskList
          tasks={filteredTasks(filter)}
          onChangeStatus={handleChangeStatusTask}
          onDisplayEditTaskForm={handleDisplayEditingTaskForm}
          onUpdateTask={handleUpdateTask}
          onDeleted={handleDeletedTask}/>
        <Footer
          onFilter={(filter) => handleFilter(filter)}
          filter={filter}
          countUndoneTasks={undoneTasks()}
          onDeleteCompletedTasks={handleDeleteCompletedTasks}/>
      </section>
    </section>
  )
}