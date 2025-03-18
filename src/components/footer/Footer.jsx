import "./footer.css"
import TaskFilter from "../task_filter/TaskFilter.jsx";

export default function Footer({onFilter, filter, countUndoneTasks, onDeleteCompletedTasks}) {
  return (
    <footer className="footer">
      <span className="todo-count">{countUndoneTasks} items left</span>
        <TaskFilter
          onFilter={(filter) => onFilter(filter)}
          filter={filter}/>
      <button
        onClick={onDeleteCompletedTasks}
        className="clear-completed"
        >Clear completed
      </button>
    </footer>
  )
}