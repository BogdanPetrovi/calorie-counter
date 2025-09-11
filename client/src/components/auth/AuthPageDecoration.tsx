import { LuApple } from "react-icons/lu";
import { GiPineapple } from "react-icons/gi";

const AuthPageDecoration = () => {
  return (
    <div className="hidden md:block w-[40vw] max-h-screen overflow-hidden bg-green-100 relative">

    <div className="bg-green-900 size-44 rounded-4xl relative left-20 top-14"></div>
    <div className="bg-green-600 size-32 rounded-4xl relative left-11/12 -top-52"></div>
    <div className="bg-green-600 size-32 rounded-full relative left-52 top-20 flex justify-center items-center z-10">
      <LuApple size={80} color="#dcfce7" fill="#dcfce7" />

    </div>
    <div className="bg-green-700 size-32 rounded-full relative left-[65%] top-40 flex justify-center items-center">
      <GiPineapple size={90} color="#dcfce7" />
    </div>
    <div className="border-8 border-green-700 size-52 rounded-4xl relative left-[85%] -top-56"></div>
    <div className="border-8 border-green-500 size-48 rounded-4xl relative right-12 -bottom-2"></div>
    <div className="bg-green-700  size-60 rounded-2xl relative left-[72%] -top-44"></div>
    </div>
  )
}

export default AuthPageDecoration
