import type React from "react"

interface HeaderProps {
  title: string
}

const Header:React.FC<HeaderProps> = ({ title }) => {
  return (
    <h2 className="text-6xl font-semibold mx-2 lg:mx-0">{title}</h2>
  )
}

export default Header