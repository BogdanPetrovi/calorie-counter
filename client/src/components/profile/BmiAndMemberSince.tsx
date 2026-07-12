import { useQuery } from "@tanstack/react-query"
import Title from "../shared/ui/Title"
import ProfileContainer from "./ui/ProfileContainer"
import apiConnection from "../../services/apiConnection"
import type BmiAndMemberSinceType from "../../types/bmiAndMemberSinceTypes"

const BmiAndMemberSince = () => {
  const { data, isPending } = useQuery({
    queryKey: ['bmi-and-member-since'],
    queryFn: async ():Promise<BmiAndMemberSinceType> => {
      const result = await apiConnection.get('/profile/bmi-and-member-since')
      return result.data
    }
  })

  if(isPending || !data) return <></>

  return (
    <>
      <ProfileContainer additionalStyles="gap-2">
        <Title name="BMI" />
        <h2 className="text-5xl font-bold">{ data.bmi.bmi }</h2>
        <h5 
          className={`
            text-xl font-semibold 
            ${ data.bmi.message === 'Normal weight' ? 'text-green-600' : data.bmi.message === 'Obese' ? 'text-red-800' : 'text-red-600' }
          `}
        >
            { data.bmi.message }
        </h5>
      </ProfileContainer>
      <ProfileContainer additionalStyles="gap-2">
        <Title name="Member since" />
        <h2 className="text-5xl font-bold">{ data.memberSince.date }</h2>
        <h5 className="text-xl font-semibold text-green-600">{ data.memberSince.months } months</h5>
      </ProfileContainer>
    </>
  )
}

export default BmiAndMemberSince