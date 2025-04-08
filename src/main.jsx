import { createRoot } from 'react-dom/client'

import App from './components/app/App.jsx'
import './styles/styles.css'
import { TasksProvider } from './components/tasks_context/TasksContext.jsx'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <TasksProvider>
    <App />
  </TasksProvider>
)
