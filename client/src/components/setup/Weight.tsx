import type React from "react"
import type { DefaultSetUpType } from "../../types/setUpTypes"
import Next from "./ui/Next"
import { useState } from "react"
import Header from "./ui/Header"
import NumInput from "./ui/NumInput"

const Weight: React.FC<DefaultSetUpType> = ({next}) => {
  const [selected, setSelected] = useState(0)
  
  return (
    <form className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <Header title={'What is your weight?'} />

      <NumInput
        min={20}
        max={300}
        setSelected={setSelected}
        placeholder="Please enter a value in kg"
      />

      <Next next={next} item="weight" result={selected} min={19} max={301} />
    </form>
  )
}

export default Weight