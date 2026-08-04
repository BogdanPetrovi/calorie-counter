export const parseMockDate = (dateStr: string): Date => {
  const [datePart, timePart] = dateStr.split('. ')
  const [day, month, year] = datePart.split('.').map(Number)
  const [hours, minutes] = timePart.split(':').map(Number)
  return new Date(year, month - 1, day, hours, minutes)
}

export const getDaysAgo = (dateStr: string): number => {
  const date = parseMockDate(dateStr)
  const now = new Date()

  const dateAtMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const nowAtMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const diffMs = nowAtMidnight.getTime() - dateAtMidnight.getTime()
  return Math.round(diffMs / (1000 * 60 * 60 * 24))
}