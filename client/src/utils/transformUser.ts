import type { BackendResponse, CompletedUser } from "../types/userTypes"

const transformUser: (BackendResponse: BackendResponse) => CompletedUser = (backendResponse) => {
   return {
    name: backendResponse.name,
    email: backendResponse.email,
    gender: backendResponse.gender,
    weight: backendResponse.weight_kg,
    height: backendResponse.height_cm,
    dateOfBirth: backendResponse.date_of_birth,
    activicyLevel: backendResponse.activicy_level,
    goal: backendResponse.goal,
    targetDailyCalories: backendResponse.target_daily_calories,
    createdAt: backendResponse.created_at
  }
}

export default transformUser 