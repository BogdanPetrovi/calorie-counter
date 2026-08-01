import getInitials from "../../../../utils/getInitials"

interface InitialsAvatarProps {
  fullName: string
}

const InitialsAvatar = ({ fullName }: InitialsAvatarProps) => {
  return (
    <div className="size-40 rounded-full bg-zinc-500/20 mb-3 flex justify-center items-center text-7xl capitalize font-bold select-none">
      { getInitials(fullName) || ''}
    </div>
  )
}

export default InitialsAvatar