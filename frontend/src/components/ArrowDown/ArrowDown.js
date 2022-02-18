import { FiArrowDownCircle } from 'react-icons/fi';
import "./ArrowDown.css"


const ArrowDown = () => {

    const arrowDownHandler = () => {
        console.log("Disliked the book")
    }

    return (<div onClick={arrowDownHandler} className="arrow"><FiArrowDownCircle /></div>)
}

export default ArrowDown