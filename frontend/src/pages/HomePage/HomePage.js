import React, { useEffect, useState } from 'react';
import { getBookByGenre } from '../../api/bookAPI';
import { Form, Button } from 'react-bootstrap';

import "./HomePage.css"
import ArrowUp from '../../components/ArrowUp/ArrowUp';
import ArrowDown from "../../components/ArrowDown/ArrowDown"

const HomePage = props => {

    const userGenres = ['Fiction', 'Comedy', 'Horror', 'Non-Fiction', 'History'];
    
    const [userGenre, setGenre] = useState(userGenres[0]);

    const getUserGenre = () => {
        // generate one of the users genres
        const index = Math.floor(Math.random() * (userGenres.length));

        // set the genre
        setGenre(userGenres[index]);
    }


    const [bookName, setBookName] = useState("");
    const [bookTitle, setBookTitle] = useState(null);
    const [bookDescription, setbookDescription] = useState(null);
    const [bookAuthor, setBookAuthor] = useState(null);
    const [bookGenres, setBookGenres] = useState(null);
    const [bookThumbnail, setBookThumbnail] = useState(null);
    const [showInfo, setShowInfo] = useState(false);


    const bookHandler = (event) => {
        let typedBookName = event.target.value;
        setBookName(typedBookName);
    }

    const displayBook = async () => {

        getUserGenre();
        const response = await getBookByGenre(userGenre);
        const book = response.data.book;
        console.log(book);
        const title = book.title;
        const thumbnail = book.thumbnail;
        const description = book.description;
        const author = book.authors[0];
        const genre = book.categories;

        setbookDescription(description)
        setBookTitle(title);
        setBookAuthor(author);
        setBookGenres(genre);
        setBookThumbnail(thumbnail);
    }

    useEffect(() => {
        displayBook()
    }, [])

    const hoverShowInfo = () => {
        setShowInfo(true)
    }

    const noHoverShowInfo = () => {
        setShowInfo(false)
    }

    return <div>
        <div style={{ "width": 600, "margin": "0 auto", "marginTop": 30 }}>

            <br />
            <ArrowUp title={bookTitle} description={bookDescription} author={bookAuthor} genre={bookGenres} thumbnail={bookThumbnail} loggedInUser={props.loggedInUser} sessionID={props.sessionID} displayBook={displayBook}/>
            {bookThumbnail &&
                <div id="imgcontainer">
                    <img className='book' onMouseEnter={hoverShowInfo} onMouseLeave={noHoverShowInfo} src={bookThumbnail}></img>
                    {showInfo && <div className="bookTitle">{bookTitle}</div>}
                    {showInfo && <div className="bio">{bookDescription}</div>}
                    {showInfo && <div className="reviewTitle">Top Review</div>}
                    {showInfo && <div className="review">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptate minus deserunt voluptatum deleniti maiores repellendus, aut quis iusto distinctio ea quasi dolore</div>}
                </div>}
            <ArrowDown />
        </div>
    </div>
}

export default HomePage;  