import { useQuery } from "@tanstack/react-query"
import CaloriesDay from "./ui/CaloriesDay"
import api from "../../services/apiConnection"
import { useUser } from "../../utils/userQuery"

const CaloriesIntakeInfo = () => {
  const { data, isPending } = useQuery({
    queryKey: ['calories-intake-info'],
    queryFn: async () => {
      const result = await api.get('/dashboard/recent-calories')
      return result.data
    }
  })
  const { data: user, isPending: isUserPending } = useUser();

  if(isPending || isUserPending) return <></>

  if(!data || !user) return <></>

  return(
    <div className="w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <CaloriesDay
        day="today"
        done={data.today}
        goal={user.targetDailyCalories}
      />
      <CaloriesDay
        day="yesterday"
        done={data.yesterday}
        goal={user.targetDailyCalories}
      />
    </div>
  )
}

export default CaloriesIntakeInfo