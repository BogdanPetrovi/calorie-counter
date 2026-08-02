import { RouterProvider } from "react-router-dom"
import { router } from "./Router"
import { lazy, Suspense, useEffect, useState } from "react"

const WeightReminder = lazy(() => import('./components/shared/ui/WeightReminder'))
const LogWeightModal = lazy(() => import('./components/profile/LogWeightModal'))


function App() {
  const [showWeightReminder, setShowWeightReminder] = useState(false)
  const [isLogWeightModal, setIsWeightModal] = useState(false)

  useEffect(() => {
    const declinedReminder = localStorage.getItem('declinedReminder')
    if(declinedReminder && Date.now() - parseInt(declinedReminder) < 1000 * 60 * 60 * 24)
      return

    const timer = setTimeout(() => setShowWeightReminder(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <RouterProvider router={router} />
      {
        showWeightReminder && 
          <Suspense fallback={null}>
            <WeightReminder close={() => setShowWeightReminder(false)} openModal={() => setIsWeightModal(true)} />
          </Suspense>
      }
      {
        isLogWeightModal &&
          <Suspense fallback={null}>
            <LogWeightModal close={() => setIsWeightModal(false)} />
          </Suspense>
      }
    </>
  )
}

export default App