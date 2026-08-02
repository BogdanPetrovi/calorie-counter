import type { IconType } from "react-icons"

interface EmptyStateProps {
  Icon: IconType,
  title: string,
  description: string,
  buttonText?: string,
  buttonAction?: () => void
}

const EmptyState = ({ Icon, title, description, buttonText, buttonAction }: EmptyStateProps) => {
  const iconClasses = "size-8 text-green-700"

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center gap-1 px-4">
      <div className="size-20 rounded-full bg-green-100 flex items-center justify-center">
        <Icon className={iconClasses} strokeWidth={1.5} />
      </div>

      <div className="flex flex-col gap-1 items-center">
        <h3 className="text-xl font-bold tracking-wide">
          { title }
        </h3>
        <p className="text-sm text-gray-400 max-w-[220px]">
          { description }
        </p>
      </div>
      {
        buttonText && buttonAction &&
          <button 
            className="mt-1 px-8 py-2 rounded-full cursor-pointer bg-green-700 text-white font-semibold hover:bg-green-600 active:bg-green-500 duration-200"
            onClick={ buttonAction }  
          >
            { buttonText }
          </button>
      }
    </div>
  )
}

export default EmptyState