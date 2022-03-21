import { FiArrowUpCircle } from 'react-icons/fi';
import "./ArrowUp.css"

import { acceptBook } from '../../api/bookAPI';
import { useState, useContext } from 'react';

import LoginModal from "../../pages/LoginModal/LoginModal"
import UserContext from "../../user/UserContext"

const ArrowUp = (props) => {
    const { username } = useContext(UserContext)
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const closeLoginModalHandler = () => {
        setShowLoginPopup(false)
    }

    const arrowUpHandler = async () => {

        // if no one is logged in
        if (username === "") {
            setShowLoginPopup(true);
            return;
        }


        const body = {
            title: props.title,
            description: props.description,
            author: props.author,
            genre: props.genre,
            username: username,
            thumbnail: props.thumbnail
        };

        const response = await acceptBook(body, props.sessionID);
        props.displayBook();
    }

    return (<div>
        <div onClick={arrowUpHandler} className="arrow">
            <FiArrowUpCircle />
        </div>
        {showLoginPopup && <LoginModal onCloseModal={closeLoginModalHandler} setSessionID={props.setSessionID} />}
    </div>)
}

export default ArrowUp