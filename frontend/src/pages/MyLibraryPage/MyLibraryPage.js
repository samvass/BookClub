import woodshelf from "../../images/woodshelf.png"
import "./MyLibraryPage.css"
import { useEffect, useState, useContext } from "react"
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Button, Modal, Form } from 'react-bootstrap';
import { BsFillPencilFill, BsFillStarFill } from 'react-icons/bs';
import { getBookByName } from "../../api/bookAPI"
import { getMyLibraryByUsername, setMyLibraryByUsername, getPreferencesByUsername, markBookAsRead, getMyReadBookByUsername } from "../../api/userAPI"

import { Navigate } from "react-router-dom"
import UserContext from "../../user/UserContext"
import SessionContext from "../../session/SessionContext"


const MyLibraryPage = props => {
    const { username } = useContext(UserContext);
    const { session } = useContext(SessionContext);

    const [userBooks, setUserBooks] = useState([])
    const [userGenres, setUserGenres] = useState([])
    const [selectedBooks, setSelectedBooks] = useState([])
    const [readBooks, setReadBooks] = useState([])
    const [selectedGenre, setSelectedGenre] = useState("all")
    const [redirect, setRedirect] = useState(false)
    const [showRemoveBook, setShowRemoveBook] = useState(false);

    useEffect(async () => {
        if (username === "") {
            setRedirect(true)
        }

        // get user preferences
        const res = await getPreferencesByUsername(username, session);
        const userGenres = res.data;
        userGenres.unshift("all");
        setUserGenres(userGenres);

        const books = await getMyLibraryByUsername(username)
        setUserBooks(books.myLibrary)
        setSelectedBooks(books.myLibrary)

        const rbooks = await getMyReadBookByUsername(username)
        setReadBooks(rbooks.myList)
    }, [])

    useEffect(() => {
        Aos.init({ duration: 1000 })
    });

    const updateFilter = (event) => {
        const newSelectedGenre = event.target.value;
        setSelectedGenre(newSelectedGenre);
        const filteredBooks = userBooks.filter(book => newSelectedGenre=="all" ? true : book.genre[0].toLowerCase().replace(/\s/g, '').includes(newSelectedGenre.toLowerCase().replace(/\s/g, '')))
        setSelectedBooks(filteredBooks);
    }

    const markAsRead = async (rtitle) => {
        const body = {
            title: rtitle,
        };
        const response = await markBookAsRead(username, body);
    }

    const markAsUnread = async (rtitle) => {
        
    }


    const displayUserBooks = (i) => selectedBooks.map((book, index) => {

        if (index >= i && index < i + 5) {
            return (<div key={index}>
                {/*{showRemoveBook && <h1>Remove</h1>}*/}
                <img className="book-picture" onMouseLeave={()=>{
                    setShowRemoveBook(false);
                }} onMouseEnter={() => {
                    setShowRemoveBook(true);
                }} src={book.thumbnail} alt={book.title} key={index}>
                </img>
            </div>)
        }
    })

    // async () => {
    //     const body = {
    //         username: username,
    //         removedBook: book
    //     };

    //     const response = await setMyLibraryByUsername(username, body)

    //     setTimeout(async () => {
    //         const returnedMyLibrary = await getMyLibraryByUsername(username)
    //         console.log(returnedMyLibrary.myLibrary)
    //         setUserBooks(returnedMyLibrary.myLibrary)
    //         setSelectedBooks(returnedMyLibrary.myLibrary.filter(book => selectedGenre=="all" ? true : book.genre[0].toLowerCase().replace(/\s/g, '').includes(selectedGenre.toLowerCase().replace(/\s/g, ''))))
    //     }, 100)

    // }

    return (<div className="myLibrary">
        <h1 className="myLibraryTitle">My Library</h1>

        {/* TODO: style this */}
        <div>
            <select className="dropDown" value={selectedGenre} onChange={updateFilter}>
                {userGenres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
            </select>
        </div>
        

        {selectedBooks.map((row, index) => {
            // create a new bookshelf every row
            if (index % 5 == 0) {
                return (<div data-aos='slide-up' key={index}>
                    <div className="displayed-books">{displayUserBooks(index)}</div>
                    <img src={woodshelf} className="shelf" alt="Wood Shelf"></img>
                </div>)
            }
        })}

    </div>)
}

export default MyLibraryPage