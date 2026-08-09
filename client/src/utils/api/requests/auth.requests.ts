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