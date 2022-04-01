import './BookDescription.css';

import Rating from '@mui/material/Rating';
import { useState, useEffect } from 'react';
import { withTheme } from '@emotion/react';

const BookDescription = (props) => {

    var sectionStyle = {
        width: "473px",
        height: "618px",
        display: "block",
        marginRight: "auto",
        marginLeft: "auto",
        boxShadow: "4px 4px 12px 6px rgba(0, 0, 0, 0.25)",
        borderRadius: "20px",
        //backgroundImage: `url(${props.thumbnail})`,
        backgroundColor: "black",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        filter: "blur(0px)",
    }

    return (
        <div style={sectionStyle}>
            <div style={{}}>
            <br />
            <div className="title">
                {props.title}
            </div>

            <br />
            <div className="author">
                By {props.author}
            </div>

            <div className="genres">
                {props.genres && props.genres.map((genre) => {
                    return <div className='genre'>{genre}</div>
                })}
            </div>
            <br />

            <div className="description">
                {props.description && props.description.length > 800 ? props.description.substring(0, 250) + " ..." : props.description}
                {/* {props.description.length > 800 ? console.log(props.description.substring(0, 250) + " ...") : console.log(props.description)} */}
            </div>

            <div style={{display: "flex", justifyContent: "center", paddingTop: "20px"}}>
                <Rating name="read-only" value={props.rating} readOnly />
            </div>
            <div style={{display: "flex", justifyContent: "center", padding: "5px", color: "white"}}>
                {props.errorMessage && <div>{props.errorMessage}</div>}
                {!props.errorMessage && <div>Based on {props.ratingCount} ratings</div>}
            </div>

            <br />
                            
            </div>
        </div>
    )
}

export default BookDescription