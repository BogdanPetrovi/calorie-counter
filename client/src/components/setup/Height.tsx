import type React from "react"
import type { DefaultSetUpType } from "../../types/setUpTypes"
import Next from "./ui/Next"
import { useState } from "react"
import Header from "./ui/Header"
import NumInput from "./ui/NumInput"

const Height: React.FC<DefaultSetUpType> = ({next}) => {
  const [selected, setSelected] = useState(0)
  
  return (
    <form className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <Header title={'What is your height?'} />

      <NumInput
        min={140}
        max={230}
        setSelected={setSelected}
        placeholder="Please enter a value in cm"
      />

      <Next next={next} item="height" result={selected} min={139} max={231} />
    </form>
  )
}

export default Height