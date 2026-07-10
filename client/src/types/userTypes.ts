export interface User {
  name: string,
  email: string
}

export interface AdditionalUserData {
  gender: string,
  weight: number,
  height: number,
  dateOfBirth: string,
  activicyLevel: string,
  goal: string,
  targetDailyCalories: number,
  createdAt: string,
  updatedAt: string
}

export interface CompletedUser extends User, AdditionalUserData {}

export interface BackendResponse extends User {
  gender: string,
  weight_kg: number,
  height_cm: number,
  date_of_birth: string,
  activicy_level: string,
  goal: string,
  target_daily_calories: number,
  created_at: string,
  updated_at: string
}