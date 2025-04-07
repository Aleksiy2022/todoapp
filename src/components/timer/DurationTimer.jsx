import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { getTimeLeft } from './utils.js'

export default function DurationTimer({ duration = 0, status }) {
  console.log('Ререндер таймера')
  const [isActive, setIsActive] = useState(true)
  const [taskDuration, setTaskDuration] = useState(duration)
  const [endTime, setEndTime] = useState(Date.now() + taskDuration)

  const timeLeft = getTimeLeft(taskDuration)
  useEffect(() => {
    let timer = null
    if (isActive) {
      timer = setInterval(() => {
        setTaskDuration(endTime - Date.now())
      }, 200)
    }
    return () => {
      clearInterval(timer)
    }
  }, [isActive])

  useEffect(() => {
    if (status) {
      setTaskDuration(0)
      setIsActive(false)
    }
  }, [status])

  useEffect(() => {
    if (taskDuration <= 0) {
      setIsActive(false)
    }
  }, [taskDuration])

  function handleStartTimer() {
    setEndTime(Date.now() + taskDuration)
    setIsActive(true)
  }

  function handlePauseTimer() {
    setIsActive(false)
  }

  return (
    <>
      <button className="icon icon-play" onClick={handleStartTimer}></button>
      <button className="icon icon-pause" onClick={handlePauseTimer}></button>
      {timeLeft}
    </>
  )
}

DurationTimer.propTypes = {
  id: PropTypes.string,
  duration: PropTypes.number,
  onStartTimer: PropTypes.func,
  onPauseTimer: PropTypes.func,
}
