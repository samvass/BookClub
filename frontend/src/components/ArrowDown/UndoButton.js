import "./ArrowDown.css"
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";


const UndoButton = props => {
    return (
        <div onClick={props.callback} className="arrow">
            <AwesomeButton type="primary" size="large">
                UNDO REJECTION
            </AwesomeButton>
        </div>
    )
}

export default UndoButton;