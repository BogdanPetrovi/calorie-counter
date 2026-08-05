import apiConnection from "../../../services/apiConnection";
import type AvgPerMeal from "../../../types/avgPerMealTypes";
import type HistoryStats from "../../../types/HistoryStats";
import { isDemo, withDelay } from "../demo";
import { mockAvgPerMeal, mockHistoryStats, mockLogPages } from "../mocks/history.mocks";

export async function getAvgPerMeal(): Promise<AvgPerMeal> {
  if(isDemo) {
    return withDelay(mockAvgPerMeal())
  }

  const result = await apiConnection.get('/history/avg-per-meal')
  return result.data
}

export async function getLogPages(): Promise<number> {
  if(isDemo){
    return withDelay(mockLogPages())
  }

  const result = await apiConnection.get('/history/log-pages')
  return result.data.pages
}

export async function getHistoryStats(): Promise<HistoryStats> {
  if(isDemo){
    return withDelay(mockHistoryStats())
  }

  const result = await apiConnection.get('/history/history-stats')
  return result.data
}