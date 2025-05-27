import NewTaskForm from '../new_task_form/NewTaskForm.jsx'
import TaskList from '../task_list/TaskList.jsx'
import Footer from '../footer/Footer.jsx'
import { TasksProvider } from '../tasks_context/TasksContext.jsx'

export default function App() {
  return (
    <TasksProvider>
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList />
          <Footer />
        </section>
      </section>
    </TasksProvider>
  )
}
