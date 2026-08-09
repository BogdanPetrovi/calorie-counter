import ModalContainer from "./ModalContainer"

const DemoNotification = ({ close }: { close: () => void}) => {
  return (
    <ModalContainer title="Demo notification" close={close}>
      <p className="font-semibold text-lg">
        Please note that this is a demo version of the application. Some advanced or rich features may not work as expected, 
        as this version does not have a backend connected. The demo is intended to showcase the user interface and overall 
        experience rather than full functionality.
      </p>
    </ModalContainer>
  )
}

export default DemoNotification