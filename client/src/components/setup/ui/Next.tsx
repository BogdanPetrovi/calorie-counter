interface NextProps {
  result: string | number,
  item: string,
  next: (item?: string, value?: string | number) => void,
  min?: number,
  max?: number
}

const Next = ({ result, next, item, min, max }: NextProps) => {
  const disabledLogic = typeof result === 'string' ? result !== '' ? false : true : min && result <= min || max && result >= max ? true : false

  return (
    <button 
      className={`text-5xl font-semibold bg-green-300 dark:bg-green-700 hover:bg-green-400 dark:hover:bg-green-600 text-green-700 dark:text-green-200
        w-1/2 md:w-1/4 py-3 rounded-4xl cursor-pointer duration-300 disabled:brightness-50 disabled:cursor-not-allowed disabled:pointer-events-none`}
      disabled={disabledLogic} onClick={() => next(item, result)}
    >
      Next
    </button>
  )
}

export default Next