import NewTaskForm from '../new_task_form/NewTaskForm.jsx'
import TaskList from '../task_list/TaskList.jsx'
import Footer from "../footer/Footer.jsx";
import {useState, useEffect} from 'react';
import "./app.css"
import { formatDistanceToNow } from 'date-fns'
// import "./index.css"

let maxId = 1

export default function App() {
  const [todoData, setTodoData] = useState([])

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

  function handleChangeStatusTask(id) {
    const updatedTodoData = todoData.map(elem => {
      if (elem.id === id) {
        elem.statusClass === "" ? elem.statusClass = "completed" : elem.statusClass = ""
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
      id: maxId++
    }
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

  return (
    <section className="todoapp">
      <NewTaskForm onAddNewTask={handleAddNewTask}/>
      <section className="main">
        <TaskList
          tasks={todoData}
          onChangeStatus={handleChangeStatusTask}
          onDisplayEditTaskForm={handleDisplayEditingTaskForm}
          onUpdateTask={handleUpdateTask}
          onDeleted={handleDeletedTask}/>
        <Footer/>
      </section>
    </section>
  )
}