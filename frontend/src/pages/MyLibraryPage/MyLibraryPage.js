import woodshelf from "../../images/woodshelf.png"
import "./MyLibraryPage.css"
import { useEffect, useState } from "react"
import Aos from 'aos'
import 'aos/dist/aos.css'

import { getBookByName } from "../../api/bookAPI"
import { getMyLibraryByUsername, setMyLibraryByUsername } from "../../api/userAPI"

import { Navigate } from "react-router-dom"


const MyLibraryPage = props => {

    const [userBooks, setUserBooks] = useState([])
    const [redirect, setRedirect] = useState(false)

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


    const displayUserBooks = (i) => userBooks.map((book, index) => {

        if (index >= i && index < i+5){
            return (<div>
            <img className="book-picture" onClick={async () => {
                const body = {
                    username: props.loggedInUser,
                    removedBook: book
                };
                
                const response = await setMyLibraryByUsername(props.loggedInUser, body)
                
                setTimeout(async () => {
                    const returnedMyLibrary = await getMyLibraryByUsername(props.loggedInUser)
                    console.log(returnedMyLibrary.myLibrary)
                    setUserBooks(returnedMyLibrary.myLibrary)
                }, 100)
                
            }} src={book.thumbnail} alt={book.title} key={index}></img>
        </div>)
        }
    })




    return (<div className="myLibrary">
        <h1 className="myLibraryTitle">My Library</h1>
        {userBooks.map((row, index) => {
            // create a new bookshelf every row
            if (index % 5 == 0){
            return (<div data-aos='slide-up'>
                <div className="displayed-books">{displayUserBooks(index)}</div>
                <img src={woodshelf} className="shelf" alt="Wood Shelf"></img>
            </div>)
        }
        })}
    </div>)
}

export default MyLibraryPage