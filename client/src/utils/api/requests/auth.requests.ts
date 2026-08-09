import apiConnection from "../../../services/apiConnection"
import { isDemo, withDelayError } from "../demo"

export const changePassword = ({ password, newPassword }: { password: string, newPassword: string }) => {
  if (isDemo) {
    return withDelayError({ message: "You can't change password in demo mode.", errorInput: 'old' })
  }

  return apiConnection.post("/auth/change-password", { password, newPassword })
}

export const logOut = () => {
  if(isDemo) {
    return withDelayError({ message: "You can't log out in demo mode." })
  }

  return apiConnection.post('/auth/logOut')
}

export const logIn = ({ email, password }: { email: string, password: string }) => {
  if(isDemo) {
    return withDelayError({ message: "You can't log in in demo mode" })
  }

  return apiConnection.post('/auth/login', { email, password })
}

export const register = ({ fullName, email, password }: { fullName: string, email: string, password: string }) => {
  if(isDemo) {
    return withDelayError({ message: "You can't register in demo mode" })
  }

  return apiConnection.post('/auth/register', { fullName, email, password })
}