import type React from "react"

interface SelectBoxProps {
  children: React.ReactNode,
  item: string,
  changeSelect: (gender: string) => void,
  selected: string
}

const SelectBox:React.FC<SelectBoxProps> = ({children, changeSelect, item, selected}) => {
  const styles = "flex flex-col gap-2 items-center justify-center cursor-pointer border-5 rounded-3xl border-green-700 p-4 duration-300"

  return (
    <div className={`${styles} ${selected === item ? ' bg-zinc-200' : ''}`} onClick={() => changeSelect(item)}>
      {children}
    </div>
  )
}

export default SelectBox