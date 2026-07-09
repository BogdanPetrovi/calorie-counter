import type { Dispatch, SetStateAction } from "react"

interface InputProps {
  name: string,
  placeholder: string,
  type: 'text' | 'number',
  value: string,
  setValue: Dispatch<SetStateAction<string>>
}

const Input = ({ name, placeholder, type, value, setValue }: InputProps) => {
  return (
    <div className="text-sm">
      <h5>{name}</h5>
      <input 
        type={type}
        value={value}
        className="border border-green-600 rounded-lg w-full p-2 text-xl focus:outline-none focus:ring-0"
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

export default Input