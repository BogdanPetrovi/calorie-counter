import apiConnection from "../../../services/apiConnection"
import transformUser from "../../transformUser"
import { isDemo, withDelay } from "../demo"
import { mockUser } from "../mocks/user.mock"

export async function getUser() {
  if(isDemo) {
    return withDelay(mockUser)
  }

  const result = await apiConnection.get('/auth/getUserInfo')
  return transformUser(result.data)
}