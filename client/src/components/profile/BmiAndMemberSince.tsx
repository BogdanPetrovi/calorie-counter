import Title from "../shared/ui/Title"
import ProfileContainer from "./ui/ProfileContainer"

const BmiAndMemberSince = () => {
  return (
    <>
      <ProfileContainer gap="gap-2">
        <Title name="BMI" />
        <h2 className="text-5xl font-bold">22.4</h2>
        <h5 className="text-xl font-semibold text-green-600">Normal weight</h5>
      </ProfileContainer>
      <ProfileContainer gap="gap-2">
        <Title name="Member since" />
        <h2 className="text-5xl font-bold">March 2026.</h2>
        <h5 className="text-xl font-semibold text-green-600">5 months</h5>
      </ProfileContainer>
    </>
  )
}

export default BmiAndMemberSince