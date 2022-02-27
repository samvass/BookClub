import woodshelf from "../../images/woodshelf.png"
import "./MyLibraryPage.css"
import { useEffect, useState } from "react"
import { getBookByName } from "../../api/bookAPI"
import { getMyLibraryByUsername } from "../../api/userAPI"

import { Navigate } from "react-router-dom"


const MyLibraryPage = props => {

    const user = {
        books: ["Cat in the hat",]
    }

    const [userBooks, setUserBooks] = useState([])
    const [redirect, setRedirect] = useState(false)


    useEffect(async () => {
        if (props.loggedInUser === "") {
            setRedirect(true)
        }

        const usersBooks = await getMyLibraryByUsername(props.loggedInUser)
        console.log(usersBooks.myLibrary)
        setUserBooks(usersBooks.myLibrary)
    }, [])

    const displayUserBooks = userBooks.map((book, index) => {
        return (<div>
            <img className="book-picture" src={book.thumbnail} alt={book.title} key={index}></img>
        </div>)
    })

    // const displayUserBooksAndShelf = () => (<div>
    //     <h1>hi</h1>
    //     <div>yo</div>
    //     {/* {displayUserBooks} */}
    //     {/* <img src={woodshelf} className="shelf" alt="Wood Shelf"></img> */}
    // </div>)

    // const isThisWorking = () => {
    //     return (<div>Hello</div>)
    // }


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