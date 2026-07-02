export default interface WeeklyStats {
  day: Days,
  calories: number
}

type Days = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'