import { useContext, useState, useEffect } from "react"
import { Button, Alert } from 'react-bootstrap';
import { leaveBookRating } from "../../api/bookAPI";
import { setMyLibraryByUsername, getMyLibraryByUsername, getMyReadBookByUsername, markBookAsRead, markBookAsUnRead, } from "../../api/userAPI"

import Modal from "../../components/modal/Modal"
import UserContext from "../../user/UserContext";
import Rating from '@mui/material/Rating';
import './BookInfoModal.css';
import SessionProvider from "../../session/SessionProvider";

const LoginModal = (props) => {
    const selectedBook = props.book
    const readBooks = props.rBooks
    let { username } = useContext(UserContext)

    const [value, setValue] = useState(0);
    const [ratingSuccess, setRatingSuccess] = useState(null);

    const markBookRead = async () => {
        const body = {
            title: selectedBook.title
        }

        const markBookAsReadResponse = await markBookAsRead(username, body);

        if (markBookAsReadResponse.message === "book was added to the read list") {
            setIsRead(true);
        }
    }


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

        setTimeout(async () => {
            const myReadingList = await getMyReadBookByUsername(username)
            props.updateReadingList(myReadingList.myList)
        }, 100)
    }

    const markAsUnread = async (urtitle) => {
        const body = {
            title: urtitle,
        };
        const response = await markBookAsUnRead(username, body);

        setTimeout(async () => {
            const myReadingList = await getMyReadBookByUsername(username)
            props.updateReadingList(myReadingList.myList)
        }, 100)
    }



    return (<Modal onClosePasswordChange={props.onCloseModal}>
        <div className="modal-container">
            <h3>{selectedBook.title}</h3>
            <h5>{selectedBook.author}</h5>
            <h6>{selectedBook.description}</h6>

            <br />

            {
            !(readBooks.filter(b => b.title === selectedBook.title).length > 0) 
            ? <Button className="readButton" variant="success" onClick={async () => markAsRead(selectedBook.title)}>Mark As Read</Button> 
            : 
            <div className="modal-container">
                <div><Rating name="simple-controlled" value={value} onChange={(event, newValue) => { setValue(newValue) }} /></div>
                <div className="readButton"> <Button variant="secondary" onClick={async () => markAsUnread(selectedBook.title)}>Unread</Button></div>
                <div> <Button onClick={leaveRating}>Leave Rating</Button> </div>
            </div>}

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