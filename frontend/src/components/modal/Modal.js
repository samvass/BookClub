import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";

const Modal = (props) => {
  const portalElement = document.getElementById("overlays");

  return (
    <>
      {createPortal(
        <Backdrop onClosePasswordChange={props.onClosePasswordChange} />,
        portalElement
      )}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
