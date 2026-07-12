import { useEffect, useState } from "react"
import Input from "../shared/ui/Input"
import Title from "../shared/ui/Title"
import Submit from "../shared/ui/Submit";
import Select from "./ui/Select";
import { useUser } from "../../utils/useQuery/userQuery";
import DateInput from "./ui/DateInput";
import { useToast } from "../../context/ToastContext";
import apiConnection from "../../services/apiConnection";
import { useQueryClient } from "@tanstack/react-query";

const PhysiqueAndGoal = () => {
  const queryClient = useQueryClient();
  const { data: user, isPending } = useUser()
  const { showToast } = useToast()
  const [gender, setGender] = useState(user!.gender);
  const [dateOfBirth, setDateOfBirth] = useState(user!.dateOfBirth)
  const [height, setHeight] = useState(String(user!.height))
  const [activicyLevel, setActivicyLevel] = useState(String(user!.activicyLevel))
  const [goal, setGoal] = useState(user!.goal)
  const [calorieBudget, setCalorieBudget] = useState(String(user!.targetDailyCalories))
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if(!user) return

    setCalorieBudget(String(user.targetDailyCalories))

    if(user!.gender === gender && user!.dateOfBirth === dateOfBirth && 
      String(user!.height) === height && String(user!.activicyLevel) === activicyLevel &&
      user!.goal === goal
    ) { 
      return setIsDisabled(true)
    }
    return setIsDisabled(false)
  }, [user, gender, dateOfBirth, height, activicyLevel, goal, setIsDisabled])

  const handleSubmit = async () => {
    if(isDisabled) return
    try {
      await apiConnection.post('/profile/update-user-data', {
        gender,
        weight: user?.weight,
        height,
        dateOfBirth,
        activicyLevel,
        goal
      })

      queryClient.invalidateQueries({ queryKey: ['user'] })

      return showToast("Succesfuly changed your data!", 'success')
    } catch (err) {
      console.log(err)
      return showToast("Couldn't save your new data, try again!", 'error')
    }
  }

  if(isPending || !user) return <></>

  return (
    <div
      className="w-full bg-white shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl p-4 flex flex-col lg:grid lg:grid-cols-2 gap-2"
    >
      <div className="col-span-2">
        <Title name="Physique and goal" />
      </div>
      <Select 
        name="Gender"
        value={gender}
        setValue={setGender}
        options={[{ name: 'Male', value: 'Male' }, { name: 'Female', value: 'Female' }]}
      />
      <DateInput
        value={dateOfBirth}
        setValue={setDateOfBirth}
      />
      <Input 
        name="Height(cm)"
        placeholder="180"
        type="text"
        value={height}
        setValue={setHeight}
      />
      <Select 
        name="Activicy level"
        value={activicyLevel}
        setValue={setActivicyLevel}
        options={[
          { name: 'Not Much', value: '0' }, 
          { name: '1-2 Workouts a Week', value: '1' },
          { name: '3-5 Workouts a Week', value: '2' },
          { name: '6-7 Workouts a Week', value: '3' }        
        ]}
      />
      <Select 
        name="Goal"
        value={goal}
        setValue={setGoal}
        options={[
          { name: 'Gain', value: 'gain' }, 
          { name: 'Maintain', value: 'maintain' },
          { name: 'Lose', value: 'lose' }
        ]}
      />
      <Input 
        name="Calorie budget"
        placeholder="3000"
        type="text"
        value={calorieBudget + ' kcal'}
        setValue={setCalorieBudget}
        isDisabled
      />
      <div className="col-span-2">
        <Submit handleSubmit={handleSubmit} isDisabled={isDisabled} />
      </div>
    </div>
  )
}

export default PhysiqueAndGoal