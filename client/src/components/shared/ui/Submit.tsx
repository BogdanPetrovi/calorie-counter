interface SubmitProps {
  isDisabled: boolean,
  handleSubmit: () => void,
  buttonColor?: 'green' | 'red' | 'neutral',
  text?: string
}

const colorClasses = {
  green: {
    base: 'bg-green-700',
    hover: 'hover:bg-green-600',
    active: 'active:bg-green-500'
  },
  red: {
    base: 'bg-red-600',
    hover: 'hover:bg-red-500',
    active: 'active:bg-red-400'
  },
  neutral: {
    base: 'bg-gray-400',
    hover: 'hover:bg-gray-300',
    active: 'active:bg-gray-200'
  }
}

const Submit = ({ isDisabled, handleSubmit, text = 'Submit', buttonColor = 'green' }: SubmitProps) => {
  const colors = colorClasses[buttonColor]

  return (
    <div 
      className={`
        ${isDisabled 
          ? `${colors.base} brightness-60 cursor-not-allowed`
          : `${colors.base} ${colors.hover} ${colors.active} cursor-pointer`}
        w-full flex justify-center items-center ${buttonColor === 'neutral' ? 'text-black' : 'text-white'} p-2 rounded-lg duration-300 select-none font-semibold`
      }
      onClick={handleSubmit}
    >
      { text }
    </div>
  )
}

export default Submit