import { useEffect, useState } from "react"
import Input from "../shared/ui/Input"
import Submit from "../shared/ui/Submit"
import ModalContainer from "../shared/ui/ModalContainer"
import useUpdateWeight from "../../utils/api/mutations/useUpdateWeight"

interface LogWeightModalProps {
  close: () => void
}

const LogWeightModal = ({ close }: LogWeightModalProps) => {
  const [weight, setWeight] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  const { mutate, isPending: isMutatePending } = useUpdateWeight()
  
  useEffect(() => {
    if(weight === '' || Number(weight) < 20 || Number(weight) > 300)
      return setIsDisabled(true)

    return setIsDisabled(false)
  }, [weight, setIsDisabled])

  if(isMutatePending) return (
    <ModalContainer close={ close } title="Log weight">
      <h4 className="animate-pulse text-lg">Processing your request...</h4>
    </ModalContainer> 
  )

  return (
    <ModalContainer close={ close } title="Log weight">
      <Input 
        name="Weight (kg)"
        placeholder={"Enter weight in kg"}
        value={weight}
        setValue={setWeight}
        type="number"
      />
      <Submit 
        handleSubmit={() => {
          if(isDisabled) return  
          mutate(Number(weight), { onSuccess: () => close() })
        }}
        isDisabled={isDisabled} 
      />
    </ModalContainer>
  )
}

export default LogWeightModal