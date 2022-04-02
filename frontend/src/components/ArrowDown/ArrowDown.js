import { useContext, useState } from 'react';
import { rejectBook } from '../../api/bookAPI';
import { AwesomeButton } from 'react-awesome-button';

import LoginModal from '../../pages/LoginModal/LoginModal';
import UserContext from "../../user/UserContext"
import SessionContext from "../../session/SessionContext"

import "react-awesome-button/dist/styles.css";
import "./ArrowDown.css"

const ArrowDown = props => {
    const { username } = useContext(UserContext)
    const { session } = useContext(SessionContext)

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const arrowDownHandler = async () => {
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

        const response = await rejectBook(body, session);
        props.callback();
        props.displayBook();
    }

    return (
        <>
            <div onClick={arrowDownHandler} className="arrow">
                <AwesomeButton type="primary" size="large">
                    REJECT
                </AwesomeButton>
            </div>
            {showLoginPopup && <LoginModal onCloseModal={() => { setShowLoginPopup(false) }} />}
        </>

    )
}

export default ArrowDown