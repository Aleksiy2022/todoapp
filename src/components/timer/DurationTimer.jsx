import { useEffect, useState } from 'react'

import { getTimeLeft } from './utils.js'

export default function DurationTimer({ duration, onStartTimer, onPauseTimer }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(duration))

  useEffect(() => {
    setTimeLeft(getTimeLeft(duration))
  }, [duration])

  return (
    <>
      <button className="icon icon-play" onClick={onStartTimer}></button>
      <button className="icon icon-pause" onClick={onPauseTimer}></button>
      {timeLeft}
    </>
  )
}
