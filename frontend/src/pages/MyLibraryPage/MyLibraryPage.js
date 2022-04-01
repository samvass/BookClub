import { useEffect, useState, useContext } from "react"
import { getMyLibraryByUsername, getPreferencesByUsername, markBookAsRead, getMyReadBookByUsername, markBookAsUnRead, getMyUnReadBookByUsername } from "../../api/userAPI"
import { getBookByName } from "../../api/bookAPI"
import { Button, Modal, Form } from 'react-bootstrap';
import { BsFillPencilFill, BsFillStarFill } from 'react-icons/bs';
import { Navigate } from "react-router-dom"

import Aos from 'aos'
import 'aos/dist/aos.css'
import "./MyLibraryPage.css"
import woodshelf from "../../images/woodshelf.png"

import UserContext from "../../user/UserContext"
import SessionContext from "../../session/SessionContext"
import BookInfoModal from "../../components/BookInfoModal/BookInfoModal"


const MyLibraryPage = () => {
    const { username } = useContext(UserContext);
    const { session } = useContext(SessionContext);

    const [userBooks, setUserBooks] = useState([])
    const [userGenres, setUserGenres] = useState([])
    const [selectedBooks, setSelectedBooks] = useState([])
    const [readBooks, setReadBooks] = useState([])
    const [unreadBooks, setUnReadBooks] = useState([])
    const [selectedGenre, setSelectedGenre] = useState("all")
    const [redirect, setRedirect] = useState(false)
    const [showRemoveBook, setShowRemoveBook] = useState(false);
    const [curBook, setCurBook] = useState(null);


    useEffect(async () => {
        if (username === "") {
            setRedirect(true)
        }

        Aos.init({ duration: 500 })

        const books = await getMyLibraryByUsername(username)
        setUserBooks(books.myLibrary)
        setSelectedBooks(books.myLibrary)
        
        let userGenres = books.myLibrary.map(book => {
            return book.genre[0];
        }).filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        userGenres.unshift("all");
        setUserGenres(userGenres);

        const rbooks = await getMyReadBookByUsername(username)
        setReadBooks(rbooks.myList)

        const urbooks = await getMyUnReadBookByUsername(username)
        setUnReadBooks(urbooks.myList)
    }, [])

    const updateFilter = (event) => {
        const newSelectedGenre = event.target.value;
        setSelectedGenre(newSelectedGenre);
        const filteredBooks = userBooks.filter(book => newSelectedGenre == "all" ? true : book.genre[0].includes(newSelectedGenre))
        setSelectedBooks(filteredBooks);
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
        const response = await markBookAsRead(username, body);
    }

    const displayUserBooks = (i) => selectedBooks.map((book, index) => {
        if (index >= i && index < i + 5) {
            return (<div key={index}>
                <img className="book-picture" onClick={() => setCurBook(book)} src={book.thumbnail} alt={book.title} key={index} />
            </div >)
        }
    })

    return (
        <div className="myLibrary">
            <h1 className="myLibraryTitle">My Library</h1>
            <div className="bookFilter">
                <select value={selectedGenre} onChange={updateFilter}>
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
            {curBook && <BookInfoModal updateUsersLibrary={setSelectedBooks} book={curBook} onCloseModal={() => { setCurBook(null) }} />}
        </div>)
}

export default MyLibraryPage