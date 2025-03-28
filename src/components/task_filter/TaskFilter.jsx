import PropTypes from 'prop-types'

export default function TaskFilter({ onFilter = () => {}, filter = 'all' }) {
  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttons = buttonsData.map((btn) => {
    const isActive = filter === btn.name
    return (
      <li key={btn.name}>
        <button
          className={isActive ? 'selected' : ''}
          onClick={() => {
            onFilter(btn.name)
          }}
        >
          {btn.label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttons}</ul>
}

TaskFilter.propTypes = {
  onFilter: PropTypes.func,
  filter: PropTypes.string,
}
