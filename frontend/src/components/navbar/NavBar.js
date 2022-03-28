import bookWorm from "../../images/bookworm.png"
import "./NavBar.css"

import SpeedDialDown from "../SpeedDialDown/SpeedDialDown"

const NavBar = () => {

    return (
        <div className="header">
            <div className="logo-info">
                <h1>BookClub</h1>
                <img src={bookWorm} alt="Book Worm"></img>
            </div>
            <SpeedDialDown />
        </div >)
}

export default NavBar