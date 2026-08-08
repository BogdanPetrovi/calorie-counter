import { useEffect, useState } from "react"
import Input from "../shared/ui/Input"
import Title from "../shared/ui/Title"
import Submit from "../shared/ui/Submit";
import Select from "./ui/Select";
import { useUser } from "../../utils/api/hooks/userQuery";
import DateInput from "./ui/DateInput";
import { useConfirm } from "../../context/ConfirmContext";
import ContainerLoading from "../shared/ui/ContainerLoading";
import useUpdatePhysiqueAndGoal from "../../utils/api/mutations/useUpdatePhysiqueAndGoal";

const PhysiqueAndGoal = () => {
  const { data: user, isPending } = useUser()
  const { showConfirm, closeConfirm } = useConfirm()
  const [gender, setGender] = useState(user!.gender);
  const [dateOfBirth, setDateOfBirth] = useState(user!.dateOfBirth)
  const [height, setHeight] = useState(String(user!.height))
  const [activicyLevel, setActivicyLevel] = useState(String(user!.activicyLevel))
  const [goal, setGoal] = useState(user!.goal)
  const [calorieBudget, setCalorieBudget] = useState(String(user!.targetDailyCalories))
  const [isDisabled, setIsDisabled] = useState(true)

  const { mutate, isPending: isMutatePending } = useUpdatePhysiqueAndGoal()

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

  const handleCancel = () => {
    setGender(user!.gender)
    setDateOfBirth(user!.dateOfBirth)
    setHeight(String(user!.height))
    setActivicyLevel(String(user!.activicyLevel))
    setGoal(user!.goal)
    closeConfirm()
  }

  const handleClick = () => {
    if(isDisabled) return
    showConfirm({
      title: 'Are you sure you want to update your physique and goal data?',
      description: "Your gender, date of birth, height, activity level and goal will be updated to the new values.",
      buttonColor: 'green',
      action: () => { 
        closeConfirm();
        mutate({
          activicyLevel: Number(activicyLevel),
          dateOfBirth,
          gender,
          goal,
          height: Number(height),
          weight: user!.weight
        }); 
      },
      close: handleCancel
    })
  }

  if(isPending) return (
    <ContainerLoading request="get" title="Personal info" containerType="profile" />
  )

  if(isMutatePending) return (
    <ContainerLoading request="post" title="Personal info" containerType="profile" />
  )
  
  if(!user) return <></>

  return (
    <div
      className="w-full bg-background shadow-md shadow-shadow border border-border/50 rounded-2xl p-4 flex flex-col lg:grid lg:grid-cols-2 gap-2"
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
        <Submit handleSubmit={handleClick} isDisabled={isDisabled} />
      </div>
    </div>
  )
}

export default PhysiqueAndGoal