export const isDemo = import.meta.env.VITE_DEMO === 'true'

export function withDelay<T>(data: T, delay = 100): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay))
}