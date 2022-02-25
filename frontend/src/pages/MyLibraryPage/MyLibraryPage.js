import woodshelf from "../../images/woodshelf.png"
import "./MyLibraryPage.css"
import { useEffect, useState } from "react"
import { getBookByName } from "../../api/bookAPI"

const MyLibraryPage = () => {

    const user = {
        books: ["Cat in the hat",]
    }

    const [userBooks, setUserBooks] = useState([])

    const displayBook = async () => {

        const response = await getBookByName("Cat in the hat")
        const book = response.data.book;
        // console.log(book);

        setUserBooks([book])
        console.log(userBooks[0][0].thumbnail)
    }

    useEffect(() => {
        displayBook()
    }, [])

    // const userBooks = user.books.map(book => {
    //     return (<div>
    //         {book}
    //     </div>)
    // })

    return (<div className="myLibrary">
        <h1 className="myLibraryTitle">My Library</h1>
        {/* {userBooks} */}
        <img src={userBooks[0][0].thumbnail} className="book-on-shelf" alt="A Book"></img>
        <img src={woodshelf} className="shelf" alt="Wood Shelf"></img>
        <img src={woodshelf} className="shelf" alt="Wood Shelf"></img>
    </div>)
}

export default MyLibraryPage