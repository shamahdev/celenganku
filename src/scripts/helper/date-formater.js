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

  isDateInThisWeek: (date) => {
    const todayObj = new Date()
    const todayDate = todayObj.getDate()
    const todayDay = todayObj.getDay()

    // get first date of week
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay))

    // get last date of week
    const lastDayOfWeek = new Date(firstDayOfWeek)
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)

    // if date is equal or within the first and last dates of the week
    return date >= firstDayOfWeek && date <= lastDayOfWeek
  },
}
export default DateFormater
