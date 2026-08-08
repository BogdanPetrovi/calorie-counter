import type { CompletedUser } from "../../../types/userTypes";
import { mockWeightChange } from "./profile.mocks";

export let mockUser: CompletedUser = {
  email: 'user@example.com', 
  name: 'John Doe',
  weight: 80,
  height: 185,
  dateOfBirth: '2000-01-01',
  gender: 'male',
  activicyLevel: 1,
  goal: 'maintain',
  targetDailyCalories: 2500,
  updatedAt: '2026-07-10T13:46:05.354Z',
  createdAt: '2026-01-10T13:46:05.354Z'
}

export const updateMockPersonalInfo = (name: string, email: string ) => {
  mockUser = {
    ...mockUser,
    email,
    name
  }
  return true
}

export const updateMockPhysiqueAndGoal = (gender: string, weight: number, height: number, dateOfBirth: string, activicyLevel: number, goal: string) => {
  mockUser = {
    ...mockUser,
    gender,
    weight,
    height,
    dateOfBirth,
    activicyLevel,
    goal
  }
}

export const updateMockWeight = (weight: number) => {
  mockUser = {
    ...mockUser,
    weight
  }
  const date = new Date()
  const formatDate = Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short'
  }).format(date)
  mockWeightChange.push({
    date: formatDate,
    weight: weight
  })
}