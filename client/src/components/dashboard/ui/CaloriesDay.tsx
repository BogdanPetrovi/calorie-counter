import { LuApple } from "react-icons/lu"

const CaloriesDay = () => {
  return (
    <div className="bg-white shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl flex flex-col justify-around items-center p-3 gap-3">
      <h1 className="text-5xl font-bold self-start">Calories today</h1>
        <div className="relative inline-block">
          <LuApple className="size-[14rem] md:size-[20rem] lg:size-[23rem]" fill="#d4d4d8" color="#d4d4d8" />
          <LuApple
            fill="green"
            color="green"
            className="absolute top-0 left-0 size-[14rem] md:size-[20rem] lg:size-[23rem]"
            style={{
              clipPath: `polygon(0 0, ${Math.round((1900/2300) * 100)}% 0, ${Math.round((1900/2300) * 100)}% 100%, 0 100%)`
            }}
          />
        </div>
      <h2 className="text-4xl"><span className="font-bold">1900</span> out of <span className="font-bold">2330</span></h2>
    </div>
  )
}

export default CaloriesDay