import React, { useEffect, useState } from 'react';
import { getBookByGenre, getBookByName } from '../../api/bookAPI';
import { getPreferencesByUsername } from "../../api/userAPI"
import { Form, Button } from 'react-bootstrap';

import "./HomePage.css"
import ArrowUp from '../../components/ArrowUp/ArrowUp';
import ArrowDown from "../../components/ArrowDown/ArrowDown"

const HomePage = props => {

    const [userGenre, setGenre] = useState(null);
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
        if (props.loggedInUser !== "") {
            const userGenres = await getPreferencesByUsername(props.loggedInUser)
            // console.log(userGenres.data)
            const shownGenre = userGenres.data[Math.floor(Math.random() * userGenres.data.length)]
            // console.log(shownGenre)
            setGenre(shownGenre)
            // console.log(userGenre)
        }

        let response;
        let book;
        if (props.loggedInUser !== "") {
            console.log(userGenre)
            response = await getBookByGenre(userGenre);
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
        <ArrowUp title={bookTitle} description={bookDescription} author={bookAuthor} genre={bookGenres} thumbnail={bookThumbnail} loggedInUser={props.loggedInUser} setUserLoggedIn={props.setUserLoggedIn} setSessionID={props.setSessionID} sessionID={props.sessionID} displayBook={displayBook} />
        {bookThumbnail &&
            <div id="imgcontainer">
                <img className='book' onMouseEnter={hoverShowInfo} onMouseLeave={noHoverShowInfo} src={bookThumbnail}></img>
                {showInfo && <div onMouseEnter={hoverShowInfo} className="bookTitle">{bookTitle}</div>}
                {showInfo && <div onMouseEnter={hoverShowInfo} className="bio">{bookDescription}</div>}
                {/* {showInfo && <div className="reviewTitle">Top Review</div>} */}
                {/* {showInfo && <div className="review">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptate minus deserunt voluptatum deleniti maiores repellendus, aut quis iusto distinctio ea quasi dolore</div>} */}
            </div>}
        <ArrowDown displayBook={displayBook} />
    </div>
}

export default HomePage;  