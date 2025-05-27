import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function CreatedTimer({ createdAt = new Date().toISOString() }) {
  const updateInterval = 10000
  const [createdAgo, setCreatedAgo] = useState(calculateCreateAgo)

  function calculateCreateAgo() {
    return `created ${formatDistanceToNow(new Date(createdAt), {
      includeSeconds: true,
    })} ago`
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setCreatedAgo(calculateCreateAgo)
    }, updateInterval)
    return () => clearInterval(timerId)
  }, [])

  return <span className="description">{createdAgo}</span>
}

CreatedTimer.propTypes = {
  createdAt: PropTypes.instanceOf(Date),
}
