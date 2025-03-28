import { useEffect, useState } from 'react'

export default function DurationTimer({ taskId, duration = 0, onChangeDuration = () => {} }) {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [endTime, setEndTime] = useState(currentTime + duration)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const [isActive, setIsActive] = useState(true)

  function getTimeLeft() {
    if (currentTime >= endTime) {
      return '00:00'
    }
    const minute = new Date(endTime - currentTime).getMinutes().toString()
    const seconds = new Date(endTime - currentTime).getSeconds().toString()
    return `${minute.length === 2 ? minute : '0' + minute}:${seconds.length === 2 ? seconds : '0' + seconds}`
  }

  function handlePlay() {
    setEndTime(Date.now() + duration)
    setIsActive(true)
  }

  function handlePaused() {
    const newDuration = endTime - currentTime
    console.log(newDuration)
    setIsActive(false)
    onChangeDuration(taskId, newDuration)
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      if (isActive) {
        setTimeLeft(getTimeLeft)
        setCurrentTime(Date.now())
      } else {
        clearInterval(timerId)
      }
    }, 100)
    return () => {
      clearInterval(timerId)
    }
  }, [currentTime, isActive])

  return (
    <>
      <button className="icon icon-play" onClick={handlePlay}></button>
      <button className="icon icon-pause" onClick={handlePaused}></button>
      {timeLeft}
    </>
  )
}
