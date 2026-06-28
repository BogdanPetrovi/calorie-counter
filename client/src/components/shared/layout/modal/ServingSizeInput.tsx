import type { Dispatch, SetStateAction } from "react"

interface ServiceSizeInputProps {
  measurmentValue: string,
  setMeasurment: Dispatch<SetStateAction<string>>
  value: string,
  setValue: Dispatch<SetStateAction<string>>
}

const ServiceSizeInput = ({ value, setValue, measurmentValue, setMeasurment }: ServiceSizeInputProps) => {
  return (
    <div className="text-sm">
      <h5>Serving size (optional)</h5>
      <div className="flex w-full">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="100"
          className="w-2/3 border border-green-600 rounded-l-lg border-r-0 p-2 text-xl focus:outline-none focus:ring-0"
        />
        <select
          className="w-1/3 border border-green-600 rounded-r-lg p-2 cursor-pointer focus:outline-none focus:ring-0"
          value={measurmentValue}
          onChange={(e) => setMeasurment(e.target.value)}
        >
          <option value="g">grams</option>
          <option value="ml">milliliters</option>
          <option value="oz">ounces</option>
          <option value="pcs">piece</option>
        </select>
      </div>
    </div>
  )
}

export default ServiceSizeInput