import type ConfirmProps from "../../types/confirmPropsTypes"
import ModalContainer from "./ui/ModalContainer"
import Submit from "./ui/Submit"

const Confirm = ({ title, description, buttonColor, buttonText = 'Confirm',  close, action }: ConfirmProps) => {
  return (
    <ModalContainer close={close} title={title}>
      <h4 className="text-lg font-semibold">{ description }</h4>
      <div className="flex gap-1.5 self-end">
        <Submit handleSubmit={action} isDisabled={false} text={buttonText} buttonColor={buttonColor} />
        <Submit handleSubmit={close} isDisabled={false} text="Cancel" buttonColor="neutral" />
      </div>
    </ModalContainer>
  )
}

export default Confirm