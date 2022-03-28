import bookWorm from "../../images/bookworm.png"
import "./NavBar.css"

import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineCreate } from 'react-icons/md';
import { CgLogIn, CgLogOut } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { ImBooks } from 'react-icons/im';


const NavBar = () => {

    return (
        <div className="header">
            <h1>BookClub</h1>
            <img src={bookWorm} alt="Book Worm"></img>
        </div>)
}

export default NavBar