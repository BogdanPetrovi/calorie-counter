import type React from "react"
import type { DefaultSetUpType } from "../../types/setUpTypes"
import Next from "./ui/Next"
import Header from "./ui/Header"
import { useState } from "react"
import SelectBox from "./ui/SelectBox"
import { PiChartLineDownBold } from "react-icons/pi";
import { PiChartLineUpBold } from "react-icons/pi";
import { IoScale } from "react-icons/io5";

const Goal: React.FC<DefaultSetUpType> = ({next}) => {
  const [selected, setSelected] = useState('')

  return (
    <form className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <Header title={'What is your primary goal?'} />

      <div className="flex flex-col md:flex-row justify-center w-1/2 md:w-1/3 gap-6">
        <SelectBox 
          changeSelect={setSelected}
          item="lose"
          selected={selected}
        >
          <PiChartLineDownBold size={150} color="#27272a" className="ml-2" />
          <h3 className="text-zinc-600 font-semibold text-2xl">Lose Weight</h3>
        </SelectBox>
        <SelectBox 
          changeSelect={setSelected}
          item="maintain"
          selected={selected}
        >
          <IoScale size={150} color="#27272a" className="ml-2" />
          <h3 className="text-zinc-600 font-semibold text-xl">Maintain Weight</h3>
        </SelectBox>
        <SelectBox 
          changeSelect={setSelected}
          item="gain"
          selected={selected}
        >
          <PiChartLineUpBold size={150} color="#27272a" className="ml-2" />
          <h3 className="text-zinc-600 font-semibold text-2xl">Gain Weight</h3>
        </SelectBox>
      </div>  

      <Next item='goal' next={next} result={selected} />    
    </form>
  )
}

export default Goal