import { React, useState, useEffect} from 'react'

import './BookDescription.css';
import { Button } from 'react-bootstrap';

const BookDescription = props => {

    const [bookDescription, setBookDescription] = useState(props.description);

    // useEffect(() => {

    //     if (props.description){

    //         // trim length of the description
    //         if (props.description.length > 250){
    //             let newDesc = props.description.substring(0, 250);
    //             newDesc += "...";
    //             setBookDescription(newDesc);
    //         }
    //     }
    // }, [props.description])

  return (
    <div className="book-desc">
        <br />
        <br />
        <div className="title">
            {props.title}
        </div>

        <br />
        <div className="author">
            By {props.author}
        </div>

        <br />
        <div className="genres">
            {props.genres.map((genre)=>{
                return <div className='genre'>{genre}</div>
            })}
        </div>


        <br />

        <div className="description">
            {props.description}
        </div>

        <br />
    </div>
  )
}

export default BookDescription