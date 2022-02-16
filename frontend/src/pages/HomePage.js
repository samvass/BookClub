import React, { useState, useEffect } from 'react';
import { getBookByName } from '../api/bookAPI';
import { Form, Button } from 'react-bootstrap';

const HomePage = () => {

    const [bookName, setBookName] = useState("");
    const [bookTitle, setBookTitle] = useState(null);
    const [bookThumbnail, setBookThumbnail] = useState(null);


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

        setBookTitle(title);
        setBookThumbnail(thumbnail);
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

            {bookTitle && <div>{bookTitle}</div>}
            <br />
            {bookThumbnail && <img src={bookThumbnail}></img>}
        </div>
    </div>
}

export default HomePage;