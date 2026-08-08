import { TbLoader3 } from "react-icons/tb"
import ContainerDiv from "./ContainerDiv"
import Title from "./Title"
import ProfileContainer from "../../profile/ui/ProfileContainer"

interface ContainerLoadingProps {
  title: string,
  containerType: 'all' | 'profile' | 'weekly-stats',
  request: 'get' | 'post'
}

const ContainerLoading = ({ title, request, containerType }: ContainerLoadingProps) => {
  if(containerType === 'profile') 
    return (
      <ProfileContainer>
        <Title name={ title } />
        <div className="w-full h-full flex flex-col justify-center items-center">
          <TbLoader3 size={100} color="#16a34a" className="animate-spin" />
          {
            request === 'get' ?
              <h4 className="animate-pulse text-lg">Loading data...</h4>
            :
              <h4 className="animate-pulse text-lg">Processing your request...</h4>
          }
        </div>
      </ProfileContainer>
    )

  if(containerType === 'weekly-stats') 
    return (
      <div className="w-full lg:w-4/7 h-[26rem] lg:h-[31rem] bg-background shadow-md shadow-shadow border border-border/50 rounded-2xl p-3">
        <Title name={ title } />
        <div className="w-full h-full flex flex-col justify-center items-center">
          <TbLoader3 size={100} color="#16a34a" className="animate-spin" />
          {
            request === 'get' ?
              <h4 className="animate-pulse text-lg">Loading data...</h4>
            :
              <h4 className="animate-pulse text-lg">Processing your request...</h4>
          }
        </div>
      </div>
    )

  return (
    <ContainerDiv>
      <Title name={ title } />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <TbLoader3 size={100} color="#16a34a" className="animate-spin" />
        {
          request === 'get' ?
            <h4 className="animate-pulse text-lg">Loading data...</h4>
          :
            <h4 className="animate-pulse text-lg">Processing your request...</h4>
        }
      </div>
    </ContainerDiv>
  )
}

export default ContainerLoading