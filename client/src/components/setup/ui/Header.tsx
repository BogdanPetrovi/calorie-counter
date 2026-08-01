interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <h2 className="text-6xl font-semibold mx-2 lg:mx-0">{title}</h2>
  )
}

export default Header