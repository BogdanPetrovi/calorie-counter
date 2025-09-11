import type React from "react"
import type { DefaultSetUpType } from "../../types/setUpTypes"

const Start:React.FC<DefaultSetUpType> = ({user, next}) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-7xl font-semibold text-zinc-800 mx-2 lg:mx-0">Welcome <span className="font-bold">{ user?.name.split(' ')[0] }</span>!</h1>
      <h3 className="text-3xl font-semibold text-zinc-700 mx-2 lg:mx-0">We will need some information to make the best diet for you</h3>
      <div 
      className="w-1/2 lg:w-1/6 bg-green-300 hover:bg-green-400 text-green-700 text-center p-4 rounded-2xl text-4xl font-bold cursor-pointer duration-300"
      onClick={next}>
        Start
      </div>
    </div>
  )
}

export default Start
