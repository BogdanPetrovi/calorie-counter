import type React from "react"
import type { DefaultSetUpType } from "../../types/setUpTypes"
import { ImMan, ImWoman } from "react-icons/im";
import { useState } from "react";
import SelectBox from './ui/SelectBox'
import Next from "./ui/Next";
import Header from "./ui/Header";

const Gender: React.FC<DefaultSetUpType> = ({next}) => {
  const [selected, setSelected] = useState('')

  return (
    <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center">
      <Header title={'What is your sex?'} />
      <div className="flex flex-col md:flex-row justify-center w-1/2 md:w-1/3 gap-6">
        <SelectBox 
          changeSelect={setSelected}
          item="Male"
          selected={selected}
        >
          <ImMan size={150} color="#27272a" className="ml-2" /> 
          <h3 className="text-zinc-600 font-semibold text-2xl">Male</h3>
        </SelectBox>
        <SelectBox 
          changeSelect={setSelected}
          item="Female"
          selected={selected}
        >
          <ImWoman size={150} color="#27272a" className="ml-2" />
          <h3 className="text-zinc-600 font-semibold text-2xl">Female</h3>
        </SelectBox>
      </div>
      <Next result={selected} item="gender" next={next} />
    </div>
  )
}

export default Gender