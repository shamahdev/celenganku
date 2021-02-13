const DateFormater = {
  getTimeCounter: (date) => {
    const now = new Date().getTime()

    // Find the distance between now and the count down date
    const distance = date - now

    // Time calculations for days, hours, minutes and seconds
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    return {
      distance, hours, minutes, seconds,
    }
  },
}
export default DateFormater
