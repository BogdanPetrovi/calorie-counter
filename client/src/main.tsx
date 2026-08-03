import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from './context/ToastContext.tsx'
import { ConfirmProvider } from './context/ConfirmContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <ConfirmProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ConfirmProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
)
