import { useEffect, useState, useContext } from 'react';
import { getBookByGenre, getBookByName } from '../../api/bookAPI';
import { getPreferencesByUsername } from "../../api/userAPI"
import { getBookByNameInDatabase } from '../../api/bookAPI';

import "./HomePage.css"
import ArrowUp from '../../components/ArrowUp/ArrowUp';
import ArrowDown from "../../components/ArrowDown/ArrowDown";
import UndoButton from '../../components/ArrowDown/UndoButton';
import UserContext from '../../user/UserContext';
import SessionContext from '../../session/SessionContext';
import BookDescription from '../../components/BookDescription/BookDescription';

import ReactCardFlip from 'react-card-flip';

const HomePage = () => {
    const { setUsername, username } = useContext(UserContext);
    const { setSession } = useContext(SessionContext);

    const [bookTitle, setBookTitle] = useState(null);
    const [bookDescription, setbookDescription] = useState(null);
    const [bookAuthor, setBookAuthor] = useState(null);
    const [bookGenres, setBookGenres] = useState(null);
    const [bookThumbnail, setBookThumbnail] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [rejectedBooks, setRejectedBooks] = useState([]);

    const [rating, setRating] = useState(null);
    const [ratingCount, setRatingCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(async () => {
        displayBook()
        if (sessionStorage.getItem('sessionID')) {
            setSession(sessionStorage.getItem('sessionID'))
        }

        if (sessionStorage.getItem('username')) {
            setUsername(sessionStorage.getItem('username'))
        }
    }, [])


    useEffect(async () => {
        // get the rating of the book
        const res = await getBookByNameInDatabase(bookTitle);

        if (res.error) {
            console.log(res.error)
            setErrorMessage(res.error);
        }

        else {
            setErrorMessage(null);
            setRatingCount(res.book.ratingCount);
            setRating(res.book.rating);
        }

    }, [bookTitle]);


    const displayBook = async () => {
        let shownGenre
        if (username !== "") {
            const userGenres = await getPreferencesByUsername(username)
            shownGenre = userGenres.data[Math.floor(Math.random() * userGenres.data.length)]
        }

        let response;
        let book;
        if (username !== "") {
            response = await getBookByGenre(shownGenre);
            book = response.data.book;
        } else {
            response = await getBookByName("Plato's Sun");
            book = response.data.book[0];
        }

        console.log(book);
        if (book != null) {
            const title = book.title;
            const thumbnail = book.thumbnail;
            const description = book.description;
            let author = "";
            if (book.authors && book.authors.length > 0) {
                author = book.authors[0];
            }
            const genre = book.categories;

            setDisplayBook(description, title, author, genre, thumbnail);
        }
    }

    const setDisplayBook = (description, title, author, genre, thumbnail) => {
        setbookDescription(description)
        setBookTitle(title);
        setBookAuthor(author);
        setBookGenres(genre);
        setBookThumbnail(thumbnail);
    }

    const saveRejectedBook = () => {

        setRejectedBooks((rejectedBooks) => {
            rejectedBooks.push({
                description: bookDescription,
                title: bookTitle,
                author: bookAuthor,
                genre: bookGenres,
                thumbnail: bookThumbnail
            })
            return rejectedBooks;
        })
    }

    const undoRejection = () => {
        setRejectedBooks((rejectedBooks) => {
            const { description, title, author, genre, thumbnail } = rejectedBooks.pop();
            setDisplayBook(description, title, author, genre, thumbnail);
            return rejectedBooks;
        })
    }

    return <div>
        <ArrowUp title={bookTitle} description={bookDescription} author={bookAuthor} genre={bookGenres} thumbnail={bookThumbnail} displayBook={displayBook} />
        <br />
        {bookThumbnail &&
            <div id="imgcontainer" onClick={() => (setIsFlipped(!isFlipped))}>
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">

                    <div className="front-card" >
                        <img className='book' src={bookThumbnail}></img>
                    </div>

                    <BookDescription
                        thumbnail={bookThumbnail}
                        title={bookTitle}
                        author={bookAuthor}
                        genres={bookGenres}
                        description={bookDescription}
                        rating={rating}
                        ratingCount={ratingCount}
                        errorMessage={errorMessage}
                    />
                </ReactCardFlip>
            </div >}
        <br />
        <ArrowDown displayBook={displayBook} callback={saveRejectedBook} />
        <br></br>
        {rejectedBooks.length !== 0 && <UndoButton callback={undoRejection} />}
    </div >
}

export default HomePage;  