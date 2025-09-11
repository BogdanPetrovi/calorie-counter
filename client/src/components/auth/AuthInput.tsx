import type React from "react"
import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"

interface InputProps {
  label: string,
  type: string,
  placeholder: string,
  value: string,
  onChange: (value: string) => void
}

const AuthInput: React.FC<InputProps> = ({label, type, placeholder, value, onChange}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <label className="text-slate-800 mb-2 text-lg">{label}</label>
      <div className="w-[90%] md:w-[70%] flex justify-between items-center bg-slate-200 px-3 py-4 text-xl rounded-xl mb-5">
        <input type={type === "password" ? showPassword ? "text" : "password" : type} className="w-[95%] outline-none bg-transparent"
        placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />

        { 
          type === "password" &&
          <>
            {
              showPassword ? 
                <FaRegEyeSlash size={32} className="text-black cursor-pointer" onClick={handleChange} />
                :
                <FaRegEye size={32} className="text-black cursor-pointer" onClick={handleChange} />
            }
          
          </>
        }
      </div>
    </>
  )
}

export default AuthInput
