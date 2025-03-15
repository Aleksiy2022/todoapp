import NewTaskForm from '../new_task_form/NewTaskForm.jsx'
import TaskList from '../task_list/TaskList.jsx'
import "./app.css"

export default function App() {

  const todoData = [
    {statusClass: "completed", description: "Completed task", createdAt: "created 17 seconds ago", id: 1},
    {statusClass: "editing", description: "Editing task", createdAt: "created 5 minutes ago", id: 2},
    {statusClass: null, description: "Active task", createdAt: "created 5 minutes ago", id: 3},
  ]

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList tasks={todoData}/>
      </section>
    </section>
  )
}