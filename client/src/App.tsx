import { RouterProvider } from "react-router-dom"
import { router } from "./Router"
import { lazy, Suspense, useEffect, useState } from "react"
import { isDemo } from "./utils/api/demo"

const WeightReminder = lazy(() => import('./components/shared/ui/WeightReminder'))
const LogWeightModal = lazy(() => import('./components/profile/LogWeightModal'))
const DemoNotification = lazy(() => import('./components/shared/ui/DemoNotification'))

function App() {
  const [isShowDemo, setIsShowDemo] = useState(false)
  const [showWeightReminder, setShowWeightReminder] = useState(false)
  const [isLogWeightModal, setIsWeightModal] = useState(false)

  useEffect(() => {
    if(isDemo)
      setIsShowDemo(true)

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
      {
        isShowDemo &&
          <Suspense fallback={null}>
            <DemoNotification close={() => setIsShowDemo(false)} />
          </Suspense>
      }
    </>
  )
}

export default App