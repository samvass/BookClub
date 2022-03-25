import { useEffect, useState, useContext } from 'react';
import { getBookByGenre, getBookByName } from '../../api/bookAPI';
import { getPreferencesByUsername } from "../../api/userAPI"

import "./HomePage.css"
import ArrowUp from '../../components/ArrowUp/ArrowUp';
import ArrowDown from "../../components/ArrowDown/ArrowDown"
import UserContext from '../../user/UserContext';

const HomePage = props => {
    const { username } = useContext(UserContext);

    const [bookTitle, setBookTitle] = useState(null);
    const [bookDescription, setbookDescription] = useState(null);
    const [bookAuthor, setBookAuthor] = useState(null);
    const [bookGenres, setBookGenres] = useState(null);
    const [bookThumbnail, setBookThumbnail] = useState(null);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(async () => {
        displayBook()
    }, [])


    const displayBook = async () => {
        let shownGenre
        if (username !== "") {
            const userGenres = await getPreferencesByUsername(username)
            shownGenre = userGenres.data[Math.floor(Math.random() * userGenres.data.length)]
            console.log(shownGenre)

        }

        let response;
        let book;
        if (username !== "") {
            response = await getBookByGenre(shownGenre);
            book = response.data.book;
        } else {
            response = await getBookByName("Cat in the hat");
            book = response.data.book[0];
        }


        console.log(book);
        const title = book.title;
        const thumbnail = book.thumbnail;
        const description = book.description;
        let author = "";
        if (book.authors && book.authors.length > 0) {
            author = book.authors[0];
        }
        const genre = book.categories;

        setbookDescription(description)
        setBookTitle(title);
        setBookAuthor(author);
        setBookGenres(genre);
        setBookThumbnail(thumbnail);
    }

    const hoverShowInfo = () => {
        setShowInfo(true)
    }

    const noHoverShowInfo = () => {
        setShowInfo(false)
    }

    return <div>
        <ArrowUp title={bookTitle} description={bookDescription} author={bookAuthor} genre={bookGenres} thumbnail={bookThumbnail} displayBook={displayBook} />
        {bookThumbnail &&
            <div id="imgcontainer">
                <img className='book' onMouseEnter={hoverShowInfo} onMouseLeave={noHoverShowInfo} src={bookThumbnail}></img>
                {showInfo && <div onMouseEnter={hoverShowInfo} className="center-top">{bookTitle}</div>}
                {showInfo && <div onMouseEnter={hoverShowInfo} className="center-bottom">{bookDescription}</div>}
            </div>}
        <ArrowDown displayBook={displayBook} />
    </div>
}

export default HomePage;  