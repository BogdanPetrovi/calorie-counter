import { useQuery } from "@tanstack/react-query";
import InfoCard from "../shared/InfoCard"
import { PiFireLight } from "react-icons/pi";
import { PiAlignCenterVerticalLight } from "react-icons/pi";
import { PiCarrotThin } from "react-icons/pi";
import apiConnection from "../../services/apiConnection";
import type HistoryStats from "../../types/HistoryStats";

const UserStats = () => {
  const { data, isPending } = useQuery({
    queryKey: ['history-stats'],
    queryFn: async ():Promise<HistoryStats> => {
      const result = await apiConnection.get('/history/history-stats')
      return result.data
    }
  })

  if(isPending || !data) return <></>

  return (
  <div className="w-full lg:h-36 grid grid-cols-1 lg:grid-cols-3 gap-5">
    <InfoCard
      bgColor="bg-blue-500"
      Icon={PiFireLight}
      label="Day streak"
      value={ data.streak }
    />
    <InfoCard
      bgColor="bg-green-500"
      Icon={PiAlignCenterVerticalLight}
      label="Average meal"
      value={`${data.averageMeal} kcal`}
    />
    <InfoCard
      bgColor="bg-orange-500"
      Icon={PiCarrotThin}
      label="Most eaten food"
      value={ data.mostEatenFood }
    />
  </div>
  )
}

export default UserStats