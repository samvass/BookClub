import { useContext, useState } from "react"
import { Button, Alert } from 'react-bootstrap';
import { leaveBookRating } from "../../api/bookAPI";
import { setMyLibraryByUsername, getMyLibraryByUsername } from "../../api/userAPI"

import Modal from "../../components/modal/Modal"
import UserContext from "../../user/UserContext";
import Rating from '@mui/material/Rating';
import './BookInfoModal.css';


const LoginModal = (props) => {
    const selectedBook = props.book
    let { username } = useContext(UserContext)

    const [value, setValue] = useState(0);
    const [ratingSuccess, setRatingSuccess] = useState(null);

    const leaveRating = async () => {
        const body = {
            newRating: value
        }
        setRatingSuccess(null);
        const res = await leaveBookRating(body, selectedBook.title);
        setRatingSuccess(res.message);
    }

    const removeBookFromLibrary = async () => {
        const body = {
            username: username,
            removedBook: selectedBook
        };

        setRatingSuccess("Removing from library");
        const response = await setMyLibraryByUsername(username, body)
        props.onCloseModal()


        setTimeout(async () => {
            const returnedMyLibrary = await getMyLibraryByUsername(username)
            console.log(returnedMyLibrary.myLibrary)
            props.updateUsersLibrary(returnedMyLibrary.myLibrary)

        }, 100)
    }

    return (<Modal onClosePasswordChange={props.onCloseModal}>
        <div className="modal-container">
            <h3>{selectedBook.title}</h3>
            <h5>{selectedBook.author}</h5>
            <h6>{selectedBook.description}</h6>
            <div>
                <Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue) }} />
            </div>
            <Button onClick={leaveRating}>Leave Rating</Button>
            <div className="remove-book-button">
                <Button variant='danger' onClick={removeBookFromLibrary}>Remove From Library</Button>
            </div>
            <div>
                {ratingSuccess && <Alert variant="success">{ratingSuccess}</Alert>}
            </div>
        </div>
    </Modal >)
}

export default LoginModal