import { useEffect, useState } from "react"
import MealType from "./MealType"
import Input from "./Input"
import ServingSizeInput from "./ServingSizeInput"

const AddMealModal = ({ close }: { close: () => void }) => {
  const [mealType, setMealType] = useState('breakfast')
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [servingSize, setServingSize] = useState('')
  const [servingMeasurment, setServingMeasurment] = useState('g')
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if(foodName && calories)
      setIsDisabled(false)
    else
      setIsDisabled(true)
  }, [foodName, calories, setIsDisabled])

  const handleSubmit = () => {
    setMealType('breakfast')
    setFoodName('')
    setCalories('')
    setServingSize('')
    setServingMeasurment('grams')
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={close}
    >
      <div 
        className="w-1/4 px-5 pt-3 pb-5 bg-white text-green-900 rounded-xl drop-shadow-sm drop-shadow-white border border-black/20 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between text-3xl font-bold">
          <h2>Log food</h2>
          <h2 className="cursor-pointer" onClick={close}>X</h2>
        </div>
        <MealType value={mealType} setValue={setMealType} />
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
          measurmentValue={servingMeasurment}
          setMeasurment={setServingMeasurment}
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