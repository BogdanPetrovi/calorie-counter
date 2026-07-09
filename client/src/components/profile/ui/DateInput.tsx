import type { Dispatch, SetStateAction } from "react"

interface DateInputProps {
  value: string,
  setValue: Dispatch<SetStateAction<string>>
}

const DateInput = ({ value, setValue }: DateInputProps) => {
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() - 1826)
  const maxDateFormatted = maxDate.toISOString().split('T')[0]

  return (
    <div className="text-sm">
      <h5>Date of birth</h5>
      <input 
        type="date"
        className="w-full border border-green-600 p-2 rounded-lg cursor-pointer text-xl focus:outline-none focus:ring-0"
        min={"1920-01-01"}
        max={maxDateFormatted}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default DateInput