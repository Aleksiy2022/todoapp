import "./new_task_form.css"

export default function NewTaskForm() {
  return (
    <form className="header">
      <h1>Todos</h1>
      <input className="new-todo" placeholder="What needs to be done?"/>
    </form>
  )
}