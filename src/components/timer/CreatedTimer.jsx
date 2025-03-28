import { formatDistanceToNow } from 'date-fns'
import { useEffect, useState } from 'react'

export default function CreatedTimer({ createdAt }) {
  const updateInterval = 5000
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
