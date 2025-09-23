import CaloriesDay from "./ui/CaloriesDay"

const CaloriesIntakeInfo = () => { 
  return(
    <div className="w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <CaloriesDay />
      <CaloriesDay />
    </div>
  )
}

export default CaloriesIntakeInfo