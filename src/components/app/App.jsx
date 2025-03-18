import NewTaskForm from '../new_task_form/NewTaskForm.jsx'
import TaskList from '../task_list/TaskList.jsx'
import Footer from "../footer/Footer.jsx";
import {useState} from 'react';
import "./app.css"
// import "./index.css"

const initialData = [
  {statusClass: "", description: "Completed task", createdAt: "created 17 seconds ago", id: 1},
  // {statusClass: "editing", description: "Editing task", createdAt: "created 5 minutes ago", id: 2},
  {statusClass: "", description: "Active task", createdAt: "created 5 minutes ago", id: 3},
]

export default function App() {
  const [todoData, setTodoData] = useState(initialData)

  function handleChangeStatusTask(id) {
    const updatedTodoData = todoData.map(elem => {
      if (elem.id === id) {
        elem.statusClass === "" ? elem.statusClass = "completed" : elem.statusClass = ""
        return elem
      } else return elem
    })
    setTodoData(updatedTodoData)
  }

  function displayEditingTaskForm(id) {
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

  function handleDeletedTask(id) {
    const idx = todoData.findIndex(el => el.id === id)
    const updatedTodoData = todoData.toSpliced(idx, 1)
    setTodoData(updatedTodoData)
  }

  return (
    <section className="todoapp">
      <NewTaskForm/>
      <section className="main">
        <TaskList
          tasks={todoData}
          onChangeStatus={handleChangeStatusTask}
          onEdit={displayEditingTaskForm}
          onUpdateTask={handleUpdateTask}
          onDeleted={handleDeletedTask}/>
        <Footer/>
      </section>
    </section>
  )
}