export interface User {
  name: string,
  email: string
}

export interface AdditionalUserData {
  gender: string | null,
  weight: number | null,
  height: number | null,
  dateOfBirth: string | null,
  activicyLevel: string | null,
  goal: string | null,
  targetDailyCalories: string | null,
  createdAt: string | null
}

export interface CompletedUser extends User, AdditionalUserData {}

export interface BackendResponse extends User {
  gender: string | null,
  weight_kg: number | null,
  height_cm: number | null,
  date_of_birth: string | null,
  activicy_level: string | null,
  goal: string | null,
  target_daily_calories: string | null,
  created_at: string | null
}