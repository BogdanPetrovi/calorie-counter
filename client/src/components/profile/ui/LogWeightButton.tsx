import { useState } from "react"
import LogWeightModal from "../LogWeightModal"

const LogWeightButton = () => {
  const [isActive, setIsActive] = useState(false)
  return (
    <>
      <button
        className="absolute top-4 right-4 py-1 px-5 text-white font-semibold tracking-wide bg-green-700 rounded-lg cursor-pointer hover:bg-green-600 hover:px-6 active:bg-green-500 duration-300"
        onClick={() => setIsActive(!isActive)}
      >
        Log weight
      </button>

      {
        isActive &&
          <LogWeightModal close={() => setIsActive(false)} />
      }
    </>
  )
}

export default LogWeightButton