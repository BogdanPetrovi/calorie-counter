import type { Dispatch, SetStateAction } from "react"

interface InputProps {
  name: string,
  placeholder: string,
  type: 'text' | 'number',
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  isDisabled?: boolean,
  borderColor?: string
}

const Input = ({ name, placeholder, type, value, setValue, isDisabled, borderColor='border-green-600' }: InputProps) => {
  return (
    <div className={`${isDisabled && 'opacity-60'} text-sm`}>
      <h5>{name}</h5>
      <input 
        type={type}
        value={value}
        className={`${isDisabled && 'cursor-not-allowed'} border ${borderColor} rounded-lg w-full p-2 text-xl focus:outline-none focus:ring-0`}
        placeholder={placeholder}
        onChange={e => setValue(e.target.value)}
        disabled={isDisabled}
      />
    </div>
  )
}

export default Input