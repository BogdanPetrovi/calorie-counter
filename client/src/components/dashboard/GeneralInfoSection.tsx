import GeneralInfoCard from "./ui/GeneralInfoCard"
import { LuApple } from "react-icons/lu"
import { IoScale } from "react-icons/io5"
import { GoGoal } from "react-icons/go"
import type { CompletedUser } from "../../types/userTypes"
import type React from "react"

interface GeneralInfoSectionProps {
  user: CompletedUser
}

const GeneralInfoSection:React.FC<GeneralInfoSectionProps> = ({ user }) => {
  return (
    <div className="w-full h-36 grid grid-cols-1 lg:grid-cols-3 gap-5">
      <GeneralInfoCard 
        bgColor="bg-green-600"
        Icon={LuApple}
        label="Calorie budget"
        value={user.targetDailyCalories}
      />
      <GeneralInfoCard 
        bgColor="bg-violet-500"
        Icon={IoScale}
        label="Current weight"
        value={`${user.weight}kg`}
      />
      <GeneralInfoCard 
        bgColor="bg-cyan-500"
        Icon={GoGoal}
        label="Goal"
        value={user.goal}
      />
    </div>
  )
}

export default GeneralInfoSection