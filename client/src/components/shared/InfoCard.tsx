import type { IconType } from "react-icons"

interface InfoCardProps {
  bgColor: string,
  Icon: IconType,
  label: string,
  value: string | number | null
}

const InfoCard = ({ bgColor, Icon, label, value }: InfoCardProps) => {
  return (
    <div className="bg-background flex items-center gap-5 p-6 shadow-md shadow-shadow border border-border/50 rounded-2xl">
      <div className={`size-20 text-white flex justify-center items-center rounded-full ${bgColor}`}>
        <Icon size={'3rem'} />
      </div>
      <div className="flex flex-col">
        <h5 className="text-muted text-2xl">{ label }</h5>
        <h3 
          className={`
            font-bold 
            ${ typeof value === 'string' && value.length > 12 ? 'text-2xl' : 'text-4xl' } 
            ${ label === 'Goal' && 'capitalize' }
          `}
        >
          { value }
        </h3>
      </div>
    </div>
  )
}

export default InfoCard