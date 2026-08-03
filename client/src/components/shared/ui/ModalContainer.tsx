import type { ReactNode } from "react"

interface ModalContainerProps {
  close: () => void,
  title: string,
  children: ReactNode
}

const ModalContainer = ({ close, title, children }: ModalContainerProps) => {
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={close}
    >
      <div 
        className="w-11/12 md:w-1/2 lg:w-1/3 2xl:w-1/4 px-5 pt-3 pb-5 bg-background text-green-900 dark:text-green-600 rounded-xl drop-shadow-sm drop-shadow-shadow border border-border/50 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between text-3xl font-bold">
          <h2>{ title }</h2>
          <h2 className="cursor-pointer" onClick={close}>X</h2>
        </div>
        { children }
      </div>
    </div>
  )
}

export default ModalContainer