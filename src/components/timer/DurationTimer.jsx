import { useEffect, useState } from 'react'

export default function DurationTimer({ taskId, duration = 0, onChangeDuration = () => {} }) {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [endTime, setEndTime] = useState(currentTime + duration)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const [timerIsActive, setTimerIsActive] = useState(true)
  useEffect(() => {
    const timerId = setInterval(() => {
      if (timerIsActive) {
        setCurrentTime(Date.now())
        setTimeLeft(getTimeLeft())
      } else {
        clearInterval(timerId)
      }
    }, 200)
    return () => {
      clearInterval(timerId)
    }
  }, [currentTime, timerIsActive])

  function getTimeLeft() {
    if (currentTime >= endTime) {
      return '00:00'
    }
    const minute = new Date(endTime - currentTime).getMinutes().toString()
    const seconds = new Date(endTime - currentTime).getSeconds().toString()
    return `${minute.length === 2 ? minute : '0' + minute}:${seconds.length === 2 ? seconds : '0' + seconds}`
  }

  function handlePlay() {
    setCurrentTime(Date.now())
    setEndTime(Date.now() + duration)
    setTimerIsActive(true)
  }

  function handlePaused() {
    const newDuration = endTime - currentTime
    setTimerIsActive(false)
    onChangeDuration(taskId, newDuration)
  }
  return (
    <>
      <button className="icon icon-play" onClick={handlePlay}></button>
      <button className="icon icon-pause" onClick={handlePaused}></button>
      {timeLeft}
    </>
  )
}
