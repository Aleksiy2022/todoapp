import { useCallback, useEffect, useContext } from 'react'

import { TasksContext } from '../tasks_context/TasksContext.jsx'
import NewTaskForm from '../new_task_form/NewTaskForm.jsx'
import TaskList from '../task_list/TaskList.jsx'
import Footer from '../footer/Footer.jsx'

export default function App() {
  console.log('Рендер приложения')
  console.log('----------------------------------------------')

  const { setStates, handlers } = useContext(TasksContext)

  const memoizedResetEditing = useCallback(handlers.resetEditing, [])

  useEffect(() => {
    function handleGlobalEvents(event) {
      if (event.type === 'keydown' && event.key === 'Escape') {
        setStates.setTasks(memoizedResetEditing)
      }
      if (event.type === 'click' && !event.target.classList.value.includes('edit')) {
        setStates.setTasks(memoizedResetEditing)
      }
    }

    window.addEventListener('keydown', handleGlobalEvents)
    window.addEventListener('click', handleGlobalEvents)

    return () => {
      window.removeEventListener('keydown', handleGlobalEvents)
      window.removeEventListener('click', handleGlobalEvents)
    }
  }, [])

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  )
}
