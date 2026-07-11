import Title from "../shared/ui/Title"
import Chart from "./ui/Chart"
import LogWeightButton from "./ui/LogWeightButton"
import ProfileContainer from "./ui/ProfileContainer"
import Table from "./ui/Table"

const WeightChange = () => {
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