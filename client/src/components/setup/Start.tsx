import type { DefaultSetUpType } from "../../types/setUpTypes"

const Start = ({user, next}: DefaultSetUpType) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
      <h1 className="text-7xl font-semibold text-foreground mx-2 lg:mx-0">Welcome <span className="font-bold">{ user?.name.split(' ')[0] || user?.name }</span>!</h1>
      <h3 className="text-3xl font-semibold text-muted mx-2 lg:mx-0">We will need some information to make the best diet for you</h3>
      <div 
        className="w-1/2 lg:w-1/6 bg-green-300 dark:bg-green-700 hover:bg-green-400 dark:hover:bg-green-600 text-green-700 dark:text-green-200 text-center p-4 rounded-2xl text-4xl font-bold cursor-pointer duration-300"
        onClick={() => next()}
      >
        Start
      </div>
    </div>
  )
}

export default Start
