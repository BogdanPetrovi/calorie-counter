import type { ReactNode } from "react"

const ProfileContainer = ({ children, additionalStyles }: { children?: ReactNode, additionalStyles: string }) => {
  return (
    <div className={`w-full bg-white shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl flex flex-col p-4 ${additionalStyles}`}>
      { children }
    </div>
  )
}

export default ProfileContainer