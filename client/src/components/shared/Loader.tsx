import { TbLoader3 } from "react-icons/tb";

interface LoaderProps {
  size?: number,
  text?: boolean
}

const Loader = ({ size = 150, text = true }: LoaderProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-2">
      <TbLoader3 size={size} color="#16a34a" className="animate-spin" />
      {
        text &&
          <h5 className="text-2xl animate-pulse">Getting everything ready for you...</h5>
      }
    </div>
  )
} 
export default Loader