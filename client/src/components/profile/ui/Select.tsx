import type { Dispatch, SetStateAction } from "react"

interface Option {
  value: string | number,
  name: string
}

interface SelectProps {
  name: string,
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  options: Option[]
}

const Select = ({ name, value, setValue, options }: SelectProps) => {
  return (
    <div className="text-sm">
      <h5>{name}</h5>
      <select
        className="w-full border border-green-600 p-2 rounded-lg cursor-pointer text-xl focus:outline-none focus:ring-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {
          options.map(item => (
            <option value={item.value}>{item.name}</option>
          ))
        }
      </select>
    </div>
  )
}

export default Select 