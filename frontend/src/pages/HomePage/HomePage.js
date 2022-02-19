import React, { useState } from 'react';
import { getBookByName } from '../../api/bookAPI';
import { Form, Button } from 'react-bootstrap';

import "./HomePage.css"
import ArrowUp from '../../components/ArrowUp/ArrowUp';
import ArrowDown from "../../components/ArrowDown/ArrowDown"
import NavBar from '../../components/navbar/NavBar';

const HomePage = props => {

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

    const displayBook = async (event) => {
        event.preventDefault();
        const response = await getBookByName(bookName);
        console.log(response)

        const book = response.data.book[0];
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

    const hoverShowInfo = () => {
        setShowInfo(true)
        console.log("hovering")
    }

    const noHoverShowInfo = () => {
        setShowInfo(false)
        console.log("not hovering")
    }

    return <div>
        <div style={{ "width": 600, "margin": "0 auto", "marginTop": 30 }}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Book Name"
                        value={bookName} onChange={bookHandler} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={displayBook}>
                    Display Book
                </Button>
            </Form>

            {/* {bookTitle && <div className='title'>{bookTitle}</div>} */}
            <br />
            <ArrowUp title={bookTitle} description={bookDescription} author={bookAuthor} genre={bookGenres} thumbnail={bookThumbnail} loggedInUser={props.loggedInUser}/>
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