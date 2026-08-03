import { useState, type Dispatch, type SetStateAction } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

interface PasswordInputProps {
  name: string,
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  borderColor?: string,
  errorText?: string
}

const PasswordInput = ({ name, value, setValue, borderColor='border-green-600', errorText }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={`text-sm select-none`}>
      <h5>{name}</h5>
      <div className="w-full relative">
        <input 
          type={isVisible ? 'text' : 'password'}
          value={value}
          className={`border ${borderColor} rounded-lg w-full p-2 pr-12 text-xl focus:outline-none focus:ring-0`}
          onChange={e => setValue(e.target.value)}
        />
        {
          isVisible ? 
            <FaRegEyeSlash size={32} className="text-foreground cursor-pointer absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setIsVisible(false)} />
            :
            <FaRegEye size={32} className="text-foreground cursor-pointer absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setIsVisible(true)} />
        }
      </div>
      {
        errorText &&
          <h5 className="text-red-500">{errorText}</h5>
      }
    </div>
  )
}

export default PasswordInput