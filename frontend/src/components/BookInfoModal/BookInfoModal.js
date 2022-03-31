import { useContext, useState } from "react"
import { Button } from 'react-bootstrap';
import Modal from "../../components/modal/Modal"
import UserContext from "../../user/UserContext";
import { setMyLibraryByUsername, getMyLibraryByUsername } from "../../api/userAPI"
import Rating from '@mui/material/Rating';
import { leaveRating } from "../../api/bookAPI";




const LoginModal = (props) => {
    const selectedBook = props.book
    let { username } = useContext(UserContext)
    
    const [value, setValue] = useState(2);

    
    const leaveRating = async () => {

        const body = {
            newRating: value
        }

        await leaveRating(body, selectedBook.title);
    }

    const removeBookFromLibrary = async () => {
        const body = {
            username: username,
            removedBook: selectedBook
        };


        props.onCloseModal()
        const response = await setMyLibraryByUsername(username, body)

        setTimeout(async () => {
            const returnedMyLibrary = await getMyLibraryByUsername(username)
            console.log(returnedMyLibrary.myLibrary)
            props.updateUsersLibrary(returnedMyLibrary.myLibrary)

        }, 100)
    }

    return (<Modal onClosePasswordChange={props.onCloseModal}>
        <div style={{ "width": 600, "margin": "0 auto", "marginTop": 0 }}>
            <h3>{selectedBook.title}</h3>
            <h5>{selectedBook.author}</h5>
            <h6>{selectedBook.description}</h6>
            <div>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    />
            </div>
            <Button onClick={leaveRating}>Leave Rating</Button>
            <div style={{ display: "flex", justifyContent:'center'}}>
                <div style={{ paddingTop: "50px" }}>
                    <Button variant='danger' onClick={removeBookFromLibrary}>Remove Book</Button>
                </div>
            </div>
        </div>
    </Modal >)
}

export default LoginModal