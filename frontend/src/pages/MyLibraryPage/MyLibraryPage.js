import woodshelf from "../../images/woodshelf.png"
import "./MyLibraryPage.css"
import { useEffect, useState } from "react"
import Aos from 'aos'
import 'aos/dist/aos.css'

import { getBookByName } from "../../api/bookAPI"
import { getMyLibraryByUsername, setMyLibraryByUsername } from "../../api/userAPI"
import { Button, Modal, Form } from 'react-bootstrap';
import { BsFillPencilFill, BsFillStarFill } from 'react-icons/bs';

import { Navigate } from "react-router-dom"


const MyLibraryPage = props => {

    const [userBooks, setUserBooks] = useState([]);
    const [showBookOptions, setShowBookOptions] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [show, setShow] = useState(false);
    const [stars, setStars] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(async () => {
        if (props.loggedInUser === "") {
            setRedirect(true)
        }

        const usersBooks = await getMyLibraryByUsername(props.loggedInUser)
        console.log(usersBooks)
        setUserBooks(usersBooks.myLibrary)
    }, [])

    useEffect(() => {
        Aos.init({duration: 1000})
    });

    useEffect(() => {
        // recolor the stars


    }, stars)

    const clickStar = (starNum) => {
        setStars(starNum); 
    }

    const displayUserBooks = (i) => userBooks.map((book, index) => {

        if (index >= i && index < i+5){
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
            <Button onClick={() => {setShowBookOptions(true)}} variant="primary">
                <BsFillPencilFill />
            </Button>
        </div>
        <div>
            <h1 className="myLibraryTitle">My Library</h1>
        </div>
        {userBooks.map((row, index) => {
            // create a new bookshelf every row
            if (index % 5 == 0){
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
                <BsFillStarFill onClick={clickStar(1)}/>
                <BsFillStarFill onClick={clickStar(2)}/>
                <BsFillStarFill onClick={clickStar(3)}/>
                <BsFillStarFill onClick={clickStar(4)}/>
                <BsFillStarFill onClick={clickStar(5)}/>
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