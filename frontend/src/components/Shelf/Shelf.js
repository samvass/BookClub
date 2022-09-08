import React from 'react'
import woodshelf from "../../images/woodshelf.png"
import './Shelf.css'

const Shelf = ({books}) => {
  return (
    <div className="shelf">
    <div className="books-row">
        { books.map((book, index) => {
            return (
            <div key={index}>
                <img className="book-picture" onClick={() => setCurBook(book)} src={book.thumbnail} alt={book.title} key={index} />
            </div >)
            }
        )}
    </div>
    <img src={woodshelf} className="shelf" alt="Wood Shelf"></img>
</div>
  )
}

export default Shelf