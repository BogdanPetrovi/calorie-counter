import type React from "react"
import type { DefaultSetUpType } from "../../types/setUpTypes"
import Next from "./ui/Next"
import Header from "./ui/Header"
import { useState } from "react"
import SelectBox from "./ui/SelectBox"
import { LiaDumbbellSolid } from "react-icons/lia";

const ActivicyLevel: React.FC<DefaultSetUpType> = ({next}) => {
  const [selected, setSelected] = useState('')
  

  return (
    <form className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <Header title={'How often do you exercise?'} />

      <div className="flex flex-col md:flex-row justify-center w-1/2 md:w-1/3 gap-6">
       <SelectBox 
          changeSelect={setSelected}
          item="0"
          selected={selected}
        >
          <LiaDumbbellSolid size={150} color="#ffbaba" className="ml-2" />
          <h3 className="text-zinc-600 font-semibold text-2xl">Not Much</h3>
        </SelectBox>
        <SelectBox 
          changeSelect={setSelected}
          item="1"
          selected={selected}
        >
          <LiaDumbbellSolid size={150} color="#fc6d6d" className="ml-2" />
          <h3 className="text-zinc-600 font-semibold text-2xl">1-2 Workouts a Week</h3>
        </SelectBox>
        <SelectBox 
          changeSelect={setSelected}
          item="2"
          selected={selected}
        >
          <LiaDumbbellSolid size={150} color="#ea0909" className="ml-2" />
          <h3 className="text-zinc-600 font-semibold text-2xl">3-5 Workouts a Week</h3>
        </SelectBox>
        <SelectBox 
          changeSelect={setSelected}
          item="3"
          selected={selected}
        >
          <LiaDumbbellSolid size={150} color="#9a0707" className="ml-2" />
          <h3 className="text-zinc-600 font-semibold text-2xl">6-7 Workouts a Week</h3>
        </SelectBox>
      </div>

      <Next item='activicyLevel' next={next} result={selected} />    
    </form>
  )
}

export default ActivicyLevel