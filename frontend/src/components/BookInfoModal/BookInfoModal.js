import { useContext, useState } from "react"
import { Button, Alert } from 'react-bootstrap';
import { leaveBookRating } from "../../api/bookAPI";
import { setMyLibraryByUsername, getMyLibraryByUsername, markBookAsRead, markBookAsUnRead, } from "../../api/userAPI"

import Modal from "../../components/modal/Modal"
import UserContext from "../../user/UserContext";
import Rating from '@mui/material/Rating';
import './BookInfoModal.css';


const LoginModal = (props) => {
    const selectedBook = props.book
    const readBooks = props.rBooks
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

    const markAsRead = async (rtitle) => {
        const body = {
            title: rtitle,
        };
        const response = await markBookAsRead(username, body);
    }

    const markAsUnread = async (urtitle) => {
        const body = {
            title: urtitle,
        };
        const response = await markBookAsUnRead(username, body);
    }



    return (<Modal onClosePasswordChange={props.onCloseModal}>
        <div className="modal-container">
            <h3>{selectedBook.title}</h3>
            <h5>{selectedBook.author}</h5>
            <h6>{selectedBook.description}</h6>
            <div>
                <Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue) }} />
            </div>

            <div className="readButton">{
                !(readBooks.filter(b => b.title === selectedBook.title).length > 0)
                ? <Button variant="success" onClick={async () => markAsRead(selectedBook.title)}>Read</Button>
                : <Button variant="danger" onClick={async () => markAsUnread(selectedBook.title)}>Unread</Button>
            } 
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