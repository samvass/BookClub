import woodshelf from "../../images/woodshelf.png"
import "./MyLibraryPage.css"
import { useEffect, useState } from "react"
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


    const displayUserBooks = userBooks.map((book, index) => {
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
    })




    return (<div className="myLibrary">
        <h1 className="myLibraryTitle">My Library</h1>
        <div className="displayed-books">
            {displayUserBooks}
        </div>
        <img src={woodshelf} className="shelf" alt="Wood Shelf"></img>
        {redirect && <Navigate to="/login" />}
    </div>)
}

export default MyLibraryPage