import { FiArrowDownCircle } from 'react-icons/fi';
import "./ArrowDown.css"
import { useContext } from 'react';
import { rejectBook } from '../../api/bookAPI';
import UserContext from "../../user/UserContext"
import SessionContext from "../../session/SessionContext"
import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";


const ArrowDown = props => {
    const { username } = useContext(UserContext)
    const { session } = useContext(SessionContext)


    const arrowDownHandler = async () => {
        const body = {
            title: props.title,
            description: props.description,
            author: props.author,
            genre: props.genre,
            username: username,
            thumbnail: props.thumbnail
        };

        const response = await rejectBook(body, session);
        props.callback();
        props.displayBook();
    }

    return (
        <div onClick={arrowDownHandler} className="arrow">
            <AwesomeButton type="primary" size="large">
                REJECT
            </AwesomeButton>
        </div>
    )
}

export default ArrowDown