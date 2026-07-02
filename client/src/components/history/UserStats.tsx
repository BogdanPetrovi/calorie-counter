import InfoCard from "../shared/InfoCard"
import { PiFireLight } from "react-icons/pi";
import { PiAlignCenterVerticalLight } from "react-icons/pi";
import { PiCarrotThin } from "react-icons/pi";

const UserStats = () => {
  return (
  <div className="w-full lg:h-36 grid grid-cols-1 lg:grid-cols-3 gap-5">
    <InfoCard
      bgColor="bg-blue-500"
      Icon={PiFireLight}
      label="Day streak"
      value={3}
    />
    <InfoCard
      bgColor="bg-green-500"
      Icon={PiAlignCenterVerticalLight}
      label="Average meal"
      value={"500 kcal"}
    />
    <InfoCard
      bgColor="bg-orange-500"
      Icon={PiCarrotThin}
      label="Most eaten food"
      value={"Beans"}
    />
  </div>
  )
}

export default UserStats