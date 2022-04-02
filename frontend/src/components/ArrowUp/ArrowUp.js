import { acceptBook } from '../../api/bookAPI';
import { useState, useContext } from 'react';
import { AwesomeButton } from 'react-awesome-button';

import "react-awesome-button/dist/styles.css";
import "./ArrowUp.css"

import LoginModal from "../../pages/LoginModal/LoginModal"
import UserContext from "../../user/UserContext"
import SessionContext from "../../session/SessionContext"


const ArrowUp = (props) => {
    const { username } = useContext(UserContext)
    const { session } = useContext(SessionContext)

    const [showLoginPopup, setShowLoginPopup] = useState(false);

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

        const response = await acceptBook(body, session);
        props.displayBook();
    }

    return (
        <>
            <div onClick={arrowUpHandler} className="arrow">
                <AwesomeButton type="primary" size="large">
                    ACCEPT
                </AwesomeButton>
            </div>
            {showLoginPopup && <LoginModal onCloseModal={() => { setShowLoginPopup(false) }} />}
        </>)
}

export default ArrowUp