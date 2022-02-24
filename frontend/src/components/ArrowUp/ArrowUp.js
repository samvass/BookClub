import { FiArrowUpCircle } from 'react-icons/fi';
import "./ArrowUp.css"

import { acceptBook } from '../../api/bookAPI';
import { useState } from 'react';

import LoginModal from "../../pages/LoginModal/LoginModal"

const ArrowUp = (props) => {

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const closeLoginModalHandler = () => {
        setShowLoginPopup(false)
    }

    const arrowUpHandler = async () => {

        // if no one is logged in
        if (props.loggedInUser === "") {
            setShowLoginPopup(true);
        }


        const body = {
            title: props.title,
            description: props.description,
            author: props.author,
            genre: props.genre,
            username: props.loggedInUser,
            thumbnail: props.thumbnail
        };

        const response = await acceptBook(body);
        console.log(response);
    }

    return (<div>
        <div onClick={arrowUpHandler} className="arrow">
            <FiArrowUpCircle />
        </div>
        {showLoginPopup && <LoginModal onCloseModal={closeLoginModalHandler} setUserLoggedIn={props.setUserLoggedIn} setSessionID={props.setSessionID} />}
    </div>)
}

export default ArrowUp