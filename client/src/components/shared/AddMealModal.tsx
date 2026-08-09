import { useEffect, useState } from "react"
import MealTypeSelector from "./ui/MealTypeSelector"
import Input from "./ui/Input"
import ServingSizeInput from "./ui/ServingSizeInput"
import type CompleteMealType from "../../types/completeMealType"
import splitAmount from "../../utils/splitAmount"
import Submit from "./ui/Submit"
import ModalContainer from "./ui/ModalContainer"
import useUpdateMeal from "../../utils/api/mutations/useUpdateMeal"
import useCreateMeal from "../../utils/api/mutations/useCreateMeal"

interface AddMealModalProps {
  close: () => void,
  modalValues?: CompleteMealType
}

const AddMealModal = ({ close, modalValues }: AddMealModalProps ) => {
  const [mealType, setMealType] = useState(modalValues?.mealType || 'breakfast')
  const [foodName, setFoodName] = useState(modalValues?.foodName || '')
  const [calories, setCalories] = useState(modalValues?.calories || '')
  const [size, measurment] = splitAmount(modalValues?.servingSize || '')
  const [servingSize, setServingSize] = useState(size || '')
  const [servingMeasurement, setServingMeasurement] = useState(measurment || 'g')
  const [isDisabled, setIsDisabled] = useState(true)

  const { mutate: mutateUpdate, isPending: isUpdatePending } = useUpdateMeal()
  const { mutate: mutateCreate, isPending: isCreatePending } = useCreateMeal()

  useEffect(() => {
    if(foodName && calories)
      setIsDisabled(false)
    else
      setIsDisabled(true)
  }, [foodName, calories, setIsDisabled])

  const handleSubmit = async () => {
    if(isDisabled)
      return

    const resetStates = () => {
      setMealType('breakfast')
      setFoodName('')
      setCalories('')
      setServingSize('')
      setServingMeasurement('g')
      close()
    }

    if(modalValues?.id){
      mutateUpdate(
        {
          id: modalValues.id, 
          payload: {
            foodName,
            mealType,
            calories: Number(calories),
            servingSize: servingSize && `${servingSize}${servingMeasurement}`
          }
        },
        { onSuccess: () => resetStates() }
      )
      return
    }

    mutateCreate(
      {
        foodName,
        calories: Number(calories),
        mealType,
        servingSize: servingSize && `${servingSize}${servingMeasurement}`
      },
      { onSuccess: () => resetStates() }
    )
  }

  if(isCreatePending || isUpdatePending)
    return (
      <ModalContainer close={ close } title="Add meal">
        <h4 className="animate-pulse text-lg">Processing your request...</h4>
      </ModalContainer> 
    )

  return (    
    <ModalContainer
      title="Add meal"
      close={close}
    >
      <MealTypeSelector value={mealType} setValue={setMealType} />
      <Input
        name="Food name"
        placeholder={"Chicken breast, chicken soup,..."}
        value={foodName}
        setValue={setFoodName}
        type="text"
      />
      <Input
        name="Calories (kcal)"
        placeholder={"1"}
        value={calories}
        setValue={setCalories}
        type="number"
      />
      <ServingSizeInput
        measurementValue={servingMeasurement}
        setMeasurement={setServingMeasurement}
        value={servingSize}
        setValue={setServingSize}
      />
      <Submit handleSubmit={handleSubmit} isDisabled={isDisabled} />
    </ModalContainer>
  )
}

export default AddMealModal