import { AxiosError, type InternalAxiosRequestConfig } from "axios"

export const isDemo = import.meta.env.VITE_DEMO === 'true'

export function withDelay<T>(data: T, delay = 200): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay))
}

export function withDelayError<T>(data: T, delay = 200, status = 400): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      const error = new AxiosError(
        "Demo mode error",
        String(status),
        undefined,
        undefined,
        {
          status,
          data,
          statusText: "Bad Request",
          headers: {},
          config: {} as InternalAxiosRequestConfig
        }
      )
      reject(error)
    }, delay)
  })
}