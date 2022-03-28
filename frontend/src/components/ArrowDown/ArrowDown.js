import { FiArrowDownCircle } from 'react-icons/fi';
import "./ArrowDown.css"

import { rejectBook } from '../../api/bookAPI';
import UserContext from "../../user/UserContext"

const ArrowDown = props => {
    const { username } = useContext(UserContext)

    const arrowDownHandler = async () => {
        const body = {
            title: props.title,
            description: props.description,
            author: props.author,
            genre: props.genre,
            username: username,
            thumbnail: props.thumbnail
        };

        const response = await rejectBook(body, props.sessionID);
        props.displayBook();
    }

    return (
        <div onClick={arrowDownHandler} className="arrow"><FiArrowDownCircle /></div>
    )
}

export default ArrowDown