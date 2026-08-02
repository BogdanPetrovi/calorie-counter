import { useEffect, useState } from "react"
import Input from "../shared/ui/Input"
import Submit from "../shared/ui/Submit"
import apiConnection from "../../services/apiConnection"
import { useToast } from "../../context/ToastContext"
import { useQueryClient } from "@tanstack/react-query"
import ModalContainer from "../shared/ui/ModalContainer"

interface LogWeightModalProps {
  close: () => void
}

const LogWeightModal = ({ close }: LogWeightModalProps) => {
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
        close()
        return showToast('You succesfully updated your weight!')
      }
    } catch (err) {
      console.log(err)
      return showToast('Something went wrong! Please try again!', 'error')
    }
  }

  return (
    <ModalContainer close={ close } title="Log weight">
        <Input 
          name="Weight (kg)"
          placeholder={"Enter weight in kg"}
          value={weight}
          setValue={setWeight}
          type="number"
        />
        <Submit handleSubmit={handleSubmit} isDisabled={isDisabled} />
    </ModalContainer>
  )
}

export default LogWeightModal