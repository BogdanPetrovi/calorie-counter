import type React from "react"

interface NextProps {
  result: string | number,
  item: string,
  next: (item?: string, value?: string | number) => void,
  min?: number,
  max?: number
}

const Next:React.FC<NextProps> = ({ result, next, item, min, max }) => {
  const disabledLogic = typeof result === 'string' ? result !== '' ? false : true : min && result <= min || max && result >= max ? true : false

  return (
    <button 
    className="text-5xl font-semibold text-green-800 bg-green-200 hover:bg-green-400 w-1/2 md:w-1/4 py-3 rounded-4xl cursor-pointer duration-300 disabled:bg-zinc-300 disabled:text-zinc-500 disabled:cursor-not-allowed"
    disabled={disabledLogic} onClick={() => next(item, result)}>
      Next
    </button>
  )
}

export default Next