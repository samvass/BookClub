import bookWorm from "../../images/bookworm.png"
import "./NavBar.css"
import PopOut from "../PopOut/PopOut"
import NavItem from "../NavItem/NavItem"

import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineCreate } from 'react-icons/md';
import { CgLogIn, CgLogOut } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { ImBooks } from 'react-icons/im';


const NavBar = (props) => {

    return (<div className="navibar">
        {/* <PopOut loggedInUser={props.loggedInUser} >
            <NavItem icon={<AiOutlineHome />} label="Home" />
            <NavItem icon={<FiSettings />} label="Account Settings" />
            <NavItem icon={<ImBooks />} label="My Library" />
            <NavItem icon={<MdOutlineCreate />} label="Create Account" />
            <NavItem icon={<CgLogIn />} label="Login" />
            <NavItem icon={<CgLogOut />} label="Logout" />
        </PopOut> */}
        <div className="header">
            <h1>BookClub</h1>
            <img src={bookWorm} alt="Book Worm"></img>
        </div>
    </div>)
}

export default NavBar