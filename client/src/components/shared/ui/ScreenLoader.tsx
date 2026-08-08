import { TbLoader3 } from "react-icons/tb";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-2">
      <TbLoader3 size={150} color="#16a34a" className="animate-spin" />
      <h5 className="text-2xl animate-pulse">Getting everything ready for you...</h5>
    </div>
  )
} 
export default Loader