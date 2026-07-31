import { useEffect, useState } from "react"
import MealTypeSelector from "./ui/MealTypeSelector"
import Input from "./ui/Input"
import ServingSizeInput from "./ui/ServingSizeInput"
import apiConnection from "../../services/apiConnection"
import type CompleteMealType from "../../types/completeMealType"
import splitAmount from "../../utils/splitAmount"
import { useInvalidateData } from "../../utils/refetch"
import Submit from "./ui/Submit"
import { useToast } from "../../context/ToastContext"
import ModalContainer from "./ui/ModalContainer"

interface AddMealModalProps {
  close: () => void,
  modalValues?: CompleteMealType
}

const AddMealModal = ({ close, modalValues }: AddMealModalProps ) => {
  const { invalidateAll } = useInvalidateData()

  const [mealType, setMealType] = useState(modalValues?.mealType || 'breakfast')
  const [foodName, setFoodName] = useState(modalValues?.foodName || '')
  const [calories, setCalories] = useState(modalValues?.calories || '')
  const [size, measurment] = splitAmount(modalValues?.servingSize || '')
  const [servingSize, setServingSize] = useState(size || '')
  const [servingMeasurement, setServingMeasurement] = useState(measurment || 'g')
  const [isDisabled, setIsDisabled] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    if(foodName && calories)
      setIsDisabled(false)
    else
      setIsDisabled(true)
  }, [foodName, calories, setIsDisabled])

  const handleSubmit = async () => {
    if(isDisabled)
      return
    
    if(modalValues?.id){
      try {
        const result = await apiConnection.patch('/dashboard/change-meal', {
          id: modalValues.id,
          foodName,
          mealType,
          calories,
          servingSize: servingSize && `${servingSize}${servingMeasurement}`
        })
        if(result.status === 204) {
          showToast('Succesfuly updated your meal!', 'success')
        }
      } catch (err) {
        console.log(err)
        showToast("Couldn't update your meal, try again!", 'error')
      }
    }
    else {
      try {
        const result = await apiConnection.post('/dashboard/add-meal', {
          foodName,
          calories,
          mealType,
          servingSize: servingSize && `${servingSize}${servingMeasurement}`
        })
        if(result.status === 201){
          showToast(`Succesfuly added your ${mealType}!`, 'success')
        }
      } catch (err) {
        console.log(err)
        showToast("Couldn't save your meal, try again!", 'error')
      }
    }
    
    setMealType('breakfast')
    setFoodName('')
    setCalories('')
    setServingSize('')
    setServingMeasurement('g')
    invalidateAll();
    close()
  }

  return (    
    <ModalContainer
      title="Log food"
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