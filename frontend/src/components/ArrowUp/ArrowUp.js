import { FiArrowUpCircle } from 'react-icons/fi';
import "./ArrowUp.css"


const ArrowUp = () => {

    const arrowUpHandler = () => {
        console.log("Liked the book")
    }

    return (<div onClick={arrowUpHandler} className="arrow"><FiArrowUpCircle /></div>)
}

export default ArrowUp