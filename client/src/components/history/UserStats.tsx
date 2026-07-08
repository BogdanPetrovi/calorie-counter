import InfoCard from "../shared/InfoCard"
import { PiFireLight } from "react-icons/pi";
import { PiAlignCenterVerticalLight } from "react-icons/pi";
import { PiCarrotThin } from "react-icons/pi";
import { useHistoryStats } from "../../utils/useQuery/useHistoryStatsQuery";


const UserStats = () => {
  const { data, isPending } = useHistoryStats();

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