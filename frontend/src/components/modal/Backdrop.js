import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClosePasswordChange}></div>;
};

export default Backdrop;
