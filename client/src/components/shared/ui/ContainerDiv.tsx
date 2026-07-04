import type { ReactNode } from "react"

const ContainerDiv = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="w-full h-[31rem] bg-white shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl flex flex-col gap-3 items-center p-3 overflow-hidden">
      { children }
    </div>
  )
}

export default ContainerDiv