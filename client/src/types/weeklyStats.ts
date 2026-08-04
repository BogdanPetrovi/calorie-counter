export default interface WeeklyStats {
  day: Days,
  calories: number
}

export type Days = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'