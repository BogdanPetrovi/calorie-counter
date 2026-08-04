import apiConnection from "../../../services/apiConnection";
import { isDemo, withDelay } from "../demo";
import { mockWeightReminder } from "../mocks/general.mocks";

export async function getWeightReminder(): Promise<boolean> {
  if(isDemo){
    return withDelay(mockWeightReminder)
  }

  const result = await apiConnection.get('/general/weight-reminder')
  return result.data.show
}