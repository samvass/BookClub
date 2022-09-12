import { useEffect, useState, useContext } from "react"
import { getMyLibraryByUsername, getPreferencesByUsername, markBookAsRead, getMyReadBookByUsername, markBookAsUnRead, getMyUnReadBookByUsername } from "../../api/userAPI"
import { getBookByName } from "../../api/bookAPI"
import { Button, Modal, Form } from 'react-bootstrap';
import { BsFillPencilFill, BsFillStarFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom"

import Aos from 'aos'
import 'aos/dist/aos.css'
import "./MyLibraryPage.css"
import woodshelf from "../../images/woodshelf.png"

import AuthContext from "../../Context/AuthContext"
import BookInfoModal from "../../components/BookInfoModal/BookInfoModal"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Shelf from "../../components/Shelf/Shelf";


const MyLibraryPage = () => {
    let bookCount = 0
    //const { username } = useContext(UserContext);
    const { user } = useContext(AuthContext);

    const username = user.username;

    const navigate = useNavigate()


    const [userBooks, setUserBooks] = useState([])
    const [userGenres, setUserGenres] = useState([])
    const [shelves, setShelves] = useState([])
    const [selectedBooks, setSelectedBooks] = useState([])
    const [selectedGenre, setSelectedGenre] = useState("")
    const [showRemoveBook, setShowRemoveBook] = useState(false);
    const [curBook, setCurBook] = useState(null);
    const [readBooks, setReadBooks] = useState([])


    useEffect(async () => {
        if (username === "") {
            navigate("/")
        }

        Aos.init({ duration: 500 })

        const books = await getMyLibraryByUsername(username)
        setUserBooks(books.myLibrary)
        setSelectedBooks(books.myLibrary)

        let bookArr = []
        let shelvesArr = []
        books.myLibrary.forEach((book,index) => {
            if (index % 5 === 0 && index !== 0){
                const shelf = <Shelf books={bookArr} />
                // add the new shelf to the list of shelves
                shelvesArr = [...shelvesArr, shelf]
                // empty array and get next # of books
                bookArr = []
            }
            bookArr = [...bookArr, book]
        })

        setShelves(shelvesArr)

        let userGenres = books.myLibrary.map(book => {
            return book.genre[0];
        }).filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        userGenres.unshift("all");
        setUserGenres(userGenres);

        const rbooks = await getMyReadBookByUsername(username)
        setReadBooks(rbooks.myList)

        // const urbooks = await getMyUnReadBookByUsername(username)
        // setUnReadBooks(urbooks.myList)
    }, [])

    const updateFilter = (event) => {
        const newSelectedGenre = event.target.value;
        setSelectedGenre(newSelectedGenre);
        const filteredBooks = userBooks.filter(book => newSelectedGenre == "all" ? true : book.genre[0].includes(newSelectedGenre))
        setSelectedBooks(filteredBooks);
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
                {/* <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedGenre}
                            defaultValue="All"
                            label="Genre"
                            onChange={updateFilter}
                        >
                            {userGenres.map(genre => <MenuItem key={genre} value={genre}>{genre}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Box> */}
            </div>

            {shelves}

            {/* {selectedBooks.map((row, index) => {
                // create a new bookshelf every row
                if (index % 5 == 0) {
                    return (<div data-aos='slide-up' key={index}>
                        <div className="displayed-books">{displayUserBooks(index)}</div>
                        <img src={woodshelf} className="shelf" alt="Wood Shelf"></img>
                    </div>)
                }
            })} */}
            {curBook && <BookInfoModal updateUsersLibrary={setSelectedBooks} book={curBook} rBooks={readBooks} updateReadingList={setReadBooks} onCloseModal={() => { setCurBook(null) }} />}
        </div>)
}

export default MyLibraryPage