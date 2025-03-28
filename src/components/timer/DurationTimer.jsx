import { useEffect, useState } from 'react'

import { getTimeLeft } from './utils.js'

export default function DurationTimer({ taskId, duration = 0, onChangeDuration = () => {} }) {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [endTime, setEndTime] = useState(currentTime + duration)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(currentTime, endTime))
  const [timerIsActive, setTimerIsActive] = useState(false)
  useEffect(() => {
    const timerId = setInterval(() => {
      console.log(timerIsActive)
      if (duration === 0) {
        setTimerIsActive(false)
        setTimeLeft('00:00')
      }
      if (timerIsActive) {
        console.log('timerId is active')
        setCurrentTime(Date.now())
        setTimeLeft(getTimeLeft(currentTime, endTime))
      } else {
        clearInterval(timerId)
      }
    }, 200)
    return () => {
      clearInterval(timerId)
    }
  }, [currentTime, timerIsActive, duration])

  function handlePlay() {
    if (!timerIsActive && duration !== 0) {
      setCurrentTime(Date.now())
      setEndTime(Date.now() + duration)
      setTimerIsActive(true)
    }
  }

  function handlePaused() {
    if (duration !== 0) {
      const newDuration = endTime - currentTime
      setTimerIsActive(false)
      onChangeDuration(taskId, newDuration)
    }
  }
  return (
    <>
      <button className="icon icon-play" onClick={handlePlay}></button>
      <button className="icon icon-pause" onClick={handlePaused}></button>
      {timeLeft}
    </>
  )
}
