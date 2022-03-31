import {React, useState} from 'react'

import BookDescription from '../BookDescription/BookDescription';
import './BookLibraryInfo.css';


import { Button } from 'react-bootstrap';
import Rating from '@mui/material/Rating';

import { getMyLibraryByUsername, setMyLibraryByUsername } from "../../api/userAPI"

const BookLibraryInfo = props => {

    const [value, setValue] = useState(2);


    const leaveBookRating = () => {
        const rating = value
    }
    const removeBookFromLib = async () => {

        // get book

        const body = {
            username: props.username,
            removedBook: book
        };

        const response = await setMyLibraryByUsername(username, body)

        setTimeout(async () => {
            const returnedMyLibrary = await getMyLibraryByUsername(username)
            console.log(returnedMyLibrary.myLibrary)
            setUserBooks(returnedMyLibrary.myLibrary)
            // setSelectedBooks(returnedMyLibrary.myLibrary.filter(book => selectedGenre=="all" ? true : book.genre[0].toLowerCase().replace(/\s/g, '').includes(selectedGenre.toLowerCase().replace(/\s/g, ''))))
        }, 100)

    }

// props =

// title, author, genres, description

{/* <BookDescription
    title={props.bookTitle}
    author={props.bookAuthor}
    genres={props.bookGenres}
    description={props.bookDescription}
/> */}

  return (
    <div>
    <div className='book-lib-info'>
        <div>
            <div className='section-header'>
                Book Information
            </div>
            <div className='title-txt'>
                {props.title}
            </div>
            <div className='author-txt'>
                {props.author}
            </div>
            <div className='description-txt'>
                {props.description}
            </div>

        </div>   
        <div className='leave-rating'>
            <div className='section-header'>
                Leave a rating
            </div>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
            />
            <br />
            <br />
            <Button onClick={leaveBookRating}>Submit</Button>
        </div>

    </div>
        <div className='remove-book'>
            <Button onClick={removeBookFromLib} variant="danger">Remove Book From Library</Button>   
        </div>
    </div>
  )
}

export default BookLibraryInfo