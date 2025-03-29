function getTimeLeft(duration) {
  if (duration <= 0) {
    return '00:00'
  }
  const hours = new Date(duration).getUTCHours().toString()
  const minute = new Date(duration).getMinutes().toString()
  const seconds = new Date(duration).getSeconds().toString()
  return `${hours !== '0' ? (hours.length === 2 ? hours + ':' : '0' + hours + ':') : ''}${
    minute.length === 2 ? minute : '0' + minute
  }:${seconds.length === 2 ? seconds : '0' + seconds}`
}

export { getTimeLeft }
