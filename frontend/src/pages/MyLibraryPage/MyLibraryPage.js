import woodshelf from "../../images/woodshelf.png"
import "./MyLibraryPage.css"
import { useEffect, useState, useContext } from "react"
import Aos from 'aos'
import 'aos/dist/aos.css'

import { getBookByName } from "../../api/bookAPI"
import { getMyLibraryByUsername, setMyLibraryByUsername } from "../../api/userAPI"
import { Button, Modal, Form } from 'react-bootstrap';
import { BsFillPencilFill, BsFillStarFill, BsFillFilterCircleFill } from 'react-icons/bs';

import { Navigate } from "react-router-dom"
import UserContext from "../../user/UserContext"


const MyLibraryPage = props => {
    const { username } = useContext(UserContext);

    const [userBooks, setUserBooks] = useState([]);
    const [showBookOptions, setShowBookOptions] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [show, setShow] = useState(false);
    const [preferenceFilter, setpreferenceFilter] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleBookOptions = () => {
        if (showBookOptions) {
            setShowBookOptions(false);
        }

        else {
            setShowBookOptions(true);
        }
    }

    useEffect(async () => {
        if (username === "") {
            setRedirect(true)
        }

        const usersBooks = await getMyLibraryByUsername(username)
        console.log(usersBooks)
        setUserBooks(usersBooks.myLibrary)
    }, [])

    useEffect(() => {
        Aos.init({ duration: 1000 })
    });


    const displayUserBooks = (i) => userBooks.map((book, index) => {

        if (index >= i && index < i + 5) {
            return (<div>
            <img className="book-picture" src={book.thumbnail} alt={book.title} key={index}></img>
            {showBookOptions && 
            <div>
                <Button variant="success" onClick={handleShow}>Leave a Review!</Button>
                <Button variant="danger" onClick={async () => {
                    const body = {
                        username: props.loggedInUser,
                        removedBook: book
                    };
                    
                    const response = await setMyLibraryByUsername(props.loggedInUser, body)
                    
                    setTimeout(async () => {
                        const returnedMyLibrary = await getMyLibraryByUsername(props.loggedInUser)
                        console.log(returnedMyLibrary.myLibrary)
                        setUserBooks(returnedMyLibrary.myLibrary)
                    }, 100)}}>X</Button>
            </div>}
        </div>)
        }
    })


    return (<div className="myLibrary">
        <div className='edit-button'>
            <Button onClick={handleBookOptions} variant="primary">
                <BsFillPencilFill />
            </Button>
            <Button className='filter-button' variant="dark">
                <BsFillFilterCircleFill />
            </Button>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={(event) => setEnteredUsername(event.target.value)} />
            </Form.Group>
        </div>
        <div>
            <h1 className="myLibraryTitle">My Library</h1>
        </div>
        {userBooks.map((row, index) => {
            // create a new bookshelf every row
            if (index % 5 == 0) {
                return (<div data-aos='slide-up'>
                    <div className="displayed-books">{displayUserBooks(index)}</div>
                    <img src={woodshelf} className="shelf" alt="Wood Shelf"></img>
                </div>)
            }
        })}

        <Modal show={show} onHide={handleClose}
        {...props}
        size="lg"
        dialogClassName="modal-100w"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>My Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <BsFillStarFill/>
                <BsFillStarFill/>
                <BsFillStarFill/>
                <BsFillStarFill/>
                <BsFillStarFill/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>)
}

export default MyLibraryPage