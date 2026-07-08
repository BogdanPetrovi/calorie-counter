import { useEffect, useState } from "react"
import MealTypeSelector from "./MealTypeSelector"
import Input from "./Input"
import ServingSizeInput from "./ServingSizeInput"
import apiConnection from "../../../../services/apiConnection"
import { useCaloriesIntakeInfo } from "../../../../utils/useQuery/caloriesIntakeInfoQuery"
import type { ToastWithShow } from "../../../../types/toastTypes"
import { useRecentMeals } from "../../../../utils/useQuery/recentMealsQuery"
import { useWeeklyStats } from "../../../../utils/useQuery/weeklyStatsQuery"
import type CompleteMealType from "../../../../types/completeMealType"
import { useHistoryStats } from "../../../../utils/useQuery/useHistoryStatsQuery"
import { useQueryClient } from "@tanstack/react-query"
import useLogPages from "../../../../utils/useQuery/logPagesQuery"

interface AddMealModalProps {
  close: () => void,
  toast: (toast: ToastWithShow) => void,
  modalValues?: CompleteMealType
}

const AddMealModal = ({ close, toast, modalValues }: AddMealModalProps ) => {
  const { refetch: refetchRecentCalories } = useCaloriesIntakeInfo()
  const { refetch: refetchRecentMeals } = useRecentMeals()
  const { refetch: refetchWeeklyStats } = useWeeklyStats()
  const { refetch: refetchHistoryStats } = useHistoryStats()
  const { refetch: refetchLogPages } = useLogPages()
  const queryClient = useQueryClient()

  const [mealType, setMealType] = useState(modalValues?.mealType || 'breakfast')
  const [foodName, setFoodName] = useState(modalValues?.foodName || '')
  const [calories, setCalories] = useState(modalValues?.calories || '')
  const [servingSize, setServingSize] = useState(modalValues?.servingSize || '')
  const [servingMeasurement, setServingMeasurement] = useState(modalValues?.servingMeasurment || 'g')
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if(foodName && calories)
      setIsDisabled(false)
    else
      setIsDisabled(true)
  }, [foodName, calories, setIsDisabled])

  const handleSubmit = async () => {
    try {
      if(isDisabled)
        return

      if(modalValues?.id){
        return
      }

      const result = await apiConnection.post('/dashboard/add-meal', {
        foodName,
        calories,
        mealType,
        servingSize: servingSize && `${servingSize}${servingMeasurement}`
      })
      if(result.status === 201){
        toast({ 
          message: `Succesfuly added your ${mealType}!`,  
          show: true,
          type: 'success'
        })
      }
    } catch (err) {
      console.log(err)
      toast({ 
        message: `Couldn't save your meal, try again!`,  
        show: true,
        type: 'error'
      })
    }
    setMealType('breakfast')
    setFoodName('')
    setCalories('')
    setServingSize('')
    setServingMeasurement('g')
    refetchRecentCalories()
    refetchRecentMeals()
    refetchWeeklyStats()
    refetchHistoryStats()
    refetchLogPages()
    queryClient.invalidateQueries({ queryKey: ['meal-log'] })
    close()
  }

  return (    
    <div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={close}
    >
      <div 
        className="w-11/12 md:w-1/2 lg:w-1/3 2xl:w-1/4 px-5 pt-3 pb-5 bg-white text-green-900 rounded-xl drop-shadow-sm drop-shadow-white border border-black/20 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between text-3xl font-bold">
          <h2>Log food</h2>
          <h2 className="cursor-pointer" onClick={close}>X</h2>
        </div>
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
        <div 
          className={`
            ${isDisabled ? 'bg-green-700 brightness-60 cursor-not-allowed' : 'bg-green-700 hover:bg-green-600 active:bg-green-500 cursor-pointer'}
            w-full flex justify-center items-center  text-white p-2 rounded-lg duration-300 select-none`
          }
          onClick={handleSubmit}
        >
          Submit
        </div>
      </div>
    </div>
  )
}

export default AddMealModal