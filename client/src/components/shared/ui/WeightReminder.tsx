import { useEffect } from "react"
import { FiClock, FiX } from "react-icons/fi"
import useWeightReminder from "../../../utils/useQuery/weightReminderQuery"

interface WeightReminderProps {
  close: () => void,
  openModal: () => void
}

const WeightReminder = ({ close, openModal }: WeightReminderProps) => {
  const { data: show, isPending } = useWeightReminder();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      close()
    }, 10000)
    
    return () => clearTimeout(timer)
  }, [close])
  
  if(isPending || !show) return

  const handleCloseClick = () => {
    localStorage.removeItem('declinedReminder')
    localStorage.setItem('declinedReminder', Date.now().toString())

    close();
  }  

  const handleUpdateClick = () => {
    openModal();
    close();
  }

  return (
    <>
      <div
        className='slide-in-left fixed bottom-6 right-2 lg:right-6 left-2 lg:left-auto bg-background border border-green-700 px-5 py-5 rounded-2xl shadow-2xl flex flex-col gap-3 z-50 min-w-[320px] max-w-[420px] overflow-hidden'
      >
        <div className="w-full flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-100 shrink-0">
              <FiClock size={18} />
            </div>
            <h2 className="font-semibold text-lg">Update weight</h2>
          </div>
          <button
            className="cursor-pointer flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 duration-200 shrink-0"
            onClick={handleCloseClick}
          >
            <FiX size={16} />
          </button>
        </div>
        <p className="text-muted text-sm leading-relaxed">
          You haven't updated your weight in over 5 days. Consider logging your latest weight to keep your progress on track.
        </p>
        <button 
          className="w-full bg-green-700 py-2.5 rounded-xl text-white text-sm font-semibold cursor-pointer hover:bg-green-600 active:bg-green-800 transition-colors duration-200"
          onClick={handleUpdateClick}
        >
          Update weight
        </button>
        <div
          className="absolute bottom-0 left-0 h-1 bg-green-700 toast-progress"
          style={{ animationDuration: '10s' }}
        />
      </div>
    </>
  )
}

export default WeightReminder