import apiConnection from "../../../services/apiConnection";
import type BmiAndMemberSince from "../../../types/bmiAndMemberSinceTypes";
import type WeightChangeRow from "../../../types/weightChangeTypes";
import { isDemo, withDelay } from "../demo";
import { mockBmiAndMemberSince, mockWeightChange } from "../mocks/profile.mocks";

export async function getBmiAndMemberSince(): Promise<BmiAndMemberSince> {
  if(isDemo){
    return withDelay(mockBmiAndMemberSince)
  }

  const result = await apiConnection.get('/profile/bmi-and-member-since')
  return result.data
}

export async function getWeightChange(): Promise<WeightChangeRow[]> {
  if(isDemo){
    return withDelay(mockWeightChange)
  }

  const result = await apiConnection.get('/profile/weight-change')
  return result.data
}