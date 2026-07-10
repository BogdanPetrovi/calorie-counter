import type { ReactNode } from "react"

const ProfileContainer = ({ children, gap }: { children?: ReactNode, gap: string }) => {
  return (
    <div className={`w-full bg-white shadow-md shadow-gray-200 border border-gray-200/50 rounded-2xl flex flex-col p-4 ${gap}`}>
      { children }
    </div>
  )
}

export default ProfileContainer