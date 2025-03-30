import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { getTimeLeft } from './utils.js'

export default function DurationTimer({ duration = 0, onStartTimer = () => {}, onPauseTimer = () => {} }) {
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

DurationTimer.propTypes = {
  duration: PropTypes.number,
  onStartTimer: PropTypes.func,
  onPauseTimer: PropTypes.func,
}
