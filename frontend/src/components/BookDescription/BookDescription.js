import './BookDescription.css';

const BookDescription = props => {

    return (
        <div className="book-desc">
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

            <br />
        </div>
    )
}

export default BookDescription