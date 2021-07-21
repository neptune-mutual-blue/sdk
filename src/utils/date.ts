const getMonthEndDate = (x: Date): Date => new Date(Date.UTC(x.getFullYear(), x.getMonth() + 1, 0, 23, 59, 59))

const getExpiryDate = (coverDuration: number, policyDate: Date = new Date()): number => {
  // Get the day of the month
  const day = policyDate.getUTCDate()

  let monthToAdd = coverDuration - 1

  // Jump to the next month
  day >= 25 && monthToAdd++

  // Obtain next timestamp
  const next = monthToAdd === 0 ? policyDate : new Date(policyDate.setMonth(policyDate.getMonth() + monthToAdd))

  // Get the month end date of the supplied date
  const ts = getMonthEndDate(next).getTime()

  // Convert the month end date to unix timestamp
  return Math.floor(ts / 1000)
}

export { getExpiryDate }
