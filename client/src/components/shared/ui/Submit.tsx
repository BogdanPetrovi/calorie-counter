interface SubmitProps {
  isDisabled: boolean,
  handleSubmit: () => void
}

const Submit = ({ isDisabled, handleSubmit }: SubmitProps) => {
  return (
    <div 
      className={`
        ${isDisabled ? 'bg-green-700 brightness-60 cursor-not-allowed' : 'bg-green-700 hover:bg-green-600 active:bg-green-500 cursor-pointer'}
        w-full flex justify-center items-center  text-white p-2 rounded-lg duration-300 select-none`
      }
      onClick={handleSubmit}
    >
      Submit
    </div>
  )
}

export default Submit