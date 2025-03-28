function getTimeLeft(currentTime, endTime) {
  if (currentTime >= endTime) {
    return '00:00'
  }
  const hours = new Date(endTime - currentTime).getUTCHours().toString()
  const minute = new Date(endTime - currentTime).getMinutes().toString()
  const seconds = new Date(endTime - currentTime).getSeconds().toString()
  return `${hours !== '0' ? (hours.length === 2 ? hours + ':' : '0' + hours + ':') : ''}${
    minute.length === 2 ? minute : '0' + minute
  }:${seconds.length === 2 ? seconds : '0' + seconds}`
}

export { getTimeLeft }
