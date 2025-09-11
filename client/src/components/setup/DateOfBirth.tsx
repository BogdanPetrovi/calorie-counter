import type React from "react"
import type { DefaultSetUpType } from "../../types/setUpTypes"
import Header from "./ui/Header"
import Next from "./ui/Next"
import { useState } from "react"

const DateOfBirth: React.FC<DefaultSetUpType> = ({next}) => {
  const [date, setDate] = useState('')

  const maxDate = new Date()
  // at least 5 year old
  maxDate.setDate(maxDate.getDate() - 1826)
  const maxDateFormatted = maxDate.toISOString().split('T')[0]

  return (
    <form className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
    
      <Header title={'When were you born?'} />

      <input type="date" 
        className="outline-none w-1/4 h-14 text-4xl p-2 bg-slate-200 border-0 rounded-lg"
        max={maxDateFormatted}
        min="1920-01-01"
        value={date}
        onChange={(e) => setDate(e.target.value)} />

      <Next item='dateOfBirth' next={next} result={date} />
    
    </form>
  )
}

export default DateOfBirth