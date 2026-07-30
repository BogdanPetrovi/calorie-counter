import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import Input from "../../shared/ui/Input"
import Submit from "../../shared/ui/Submit"
import apiConnection from "../../../services/apiConnection"
import { useToast } from "../../../context/ToastContext"
import { useQueryClient } from "@tanstack/react-query"

interface ModalProps {
  setIsActive: Dispatch<SetStateAction<boolean>>
}

const Modal = ({ setIsActive }: ModalProps) => {
  const [weight, setWeight] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const { showToast } = useToast()
  const queryClient = useQueryClient()
  
  useEffect(() => {
    if(weight === '' || Number(weight) < 20 || Number(weight) > 300)
      return setIsDisabled(true)

    return setIsDisabled(false)
  }, [weight, setIsDisabled])

  const handleSubmit = async () => {
    if(isDisabled)
      return

    try {
      const result = await apiConnection.post("/profile/log-weight", {
        weight: Number(weight)
      })
      if(result.status === 204){
        await Promise.all([
          await queryClient.invalidateQueries({ queryKey: ['user'] }),
          await queryClient.invalidateQueries({ queryKey: ['weight-change'] }),
          await queryClient.invalidateQueries({ queryKey: ['bmi-and-member-since'] })
        ])
        setIsActive(false)
        return showToast('You succesfully updated your weight!')
      }
    } catch (err) {
      console.log(err)
      return showToast('Something went wrong! Please try again!', 'error')
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={() => setIsActive(false)}
    >
      <div 
        className="w-11/12 md:w-1/2 lg:w-1/3 2xl:w-1/4 px-5 pt-3 pb-5 bg-white text-green-900 rounded-xl drop-shadow-sm drop-shadow-white border border-black/20 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between text-3xl font-bold">
          <h2>Update weight</h2>
          <h2 className="cursor-pointer" onClick={() => setIsActive(false)}>X</h2>
        </div>
        <Input 
          name="Weight (kg)"
          placeholder={"Enter weight in kg"}
          value={weight}
          setValue={setWeight}
          type="number"
        />
        <Submit handleSubmit={handleSubmit} isDisabled={isDisabled} />
      </div>
    </div>
  )
}

export default Modal