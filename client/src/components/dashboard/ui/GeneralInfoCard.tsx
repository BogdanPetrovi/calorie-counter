import type React from "react"
import type { IconType } from "react-icons"

interface GeneralInfoCardProps {
  bgColor: string,
  Icon: IconType,
  label: string,
  value: string | number | null
}

const GeneralInfoCard:React.FC<GeneralInfoCardProps> = ({ bgColor, Icon, label, value }) => {
  return (
    <div className="bg-white flex items-center gap-5 p-6 shadow-md shadow-gray-100 border border-gray-200/50 rounded-2xl">
      <div className={`size-20 text-white flex justify-center items-center rounded-full ${bgColor}`}>
        <Icon size={'3rem'} />
      </div>
      <div className="flex flex-col">
        <h5 className="text-zinc-600 text-2xl">{ label }</h5>
        <h3 className="font-bold text-4xl capitalize">{ value }</h3>
      </div>
    </div>
  )
}

export default GeneralInfoCard