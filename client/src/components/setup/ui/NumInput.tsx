import type React from "react"
import { useState } from "react"

interface NumInputProps {
  min: number,
  max: number,
  setSelected: (value: number) => void,
  placeholder: string
}

const NumInput: React.FC<NumInputProps> = ({ max, min, setSelected, placeholder }) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInputValue(value)
      
      const numValue = Number(value)
      setSelected(numValue)
    }


  return (
    <input 
      type="number" 
      className="w-1/4 h-14 text-4xl p-2 bg-slate-200 border-0 outline-0 rounded-lg" 
      value={inputValue} 
      min={min} 
      max={max} 
      onChange={handleChange}
      placeholder={placeholder}
      />
  )
}

export default NumInput