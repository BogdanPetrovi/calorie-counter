import { IoScale } from "react-icons/io5"
import useWeightChange from "../../utils/useQuery/weightChangeQuery"
import EmptyState from "../shared/ui/EmptyState"
import Title from "../shared/ui/Title"
import Chart from "./ui/Chart"
import LogWeightButton from "./ui/LogWeightButton"
import ProfileContainer from "./ui/ProfileContainer"
import Table from "./ui/Table"
import { useState } from "react"
import Modal from "./LogWeightModal"

const WeightChange = () => {
  const { data, isLoading } = useWeightChange();
  const [isLogWeight, setIsLogWeight] = useState(false)

  if(!data || isLoading) return <></>

  if(data.length < 2)
    return (
      <>
        <ProfileContainer additionalStyles="lg:col-span-2 relative">
          <Title name="Weight change" />
          <EmptyState
            Icon={IoScale}
            title="No weight changes yet"
            description="Log your weight to track changes and view your progress over last three months."
            buttonText="Log weight"
            buttonAction={() => setIsLogWeight(true)}
          />
        </ProfileContainer>
        {
          isLogWeight &&
            <Modal close={() => setIsLogWeight(false)} />
        }
      </>
    )

  return (
    <ProfileContainer additionalStyles="lg:col-span-2 relative">
      <Title name="Weight change" />
      <LogWeightButton />
      <Chart />
      <Table />
    </ProfileContainer>
  )
}

export default WeightChange