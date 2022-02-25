import { FiArrowDownCircle } from 'react-icons/fi';
import "./ArrowDown.css"


const ArrowDown = props => {

    const arrowDownHandler = () => {
        props.displayBook();
    }

    return (<div onClick={arrowDownHandler} className="arrow"><FiArrowDownCircle /></div>)
}

export default ArrowDown