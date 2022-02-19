import { FiArrowUpCircle } from 'react-icons/fi';
import "./ArrowUp.css"

import { acceptBook } from '../../api/bookAPI';


const ArrowUp = (props) => {

    const arrowUpHandler = async () => {
        const body = {
            title: props.title,
            description: props.description,
            author: props.author,
            genre: props.genre,
            username: props.loggedInUser,
            thumbnail: props.thumbnail
        };

        const response = await acceptBook(body);
        console.log(response);
    }

    return (<div onClick={arrowUpHandler} className="arrow"><FiArrowUpCircle /></div>)
}

export default ArrowUp