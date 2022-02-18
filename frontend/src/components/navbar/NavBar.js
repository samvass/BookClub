import bookWorm from "../../images/bookworm.png"
import "./NavBar.css"

const NavBar = () => {

    return (<div className="navbar">
        <div className="header">
            <h1>BookClub</h1>
            <img src={bookWorm} alt="Book Worm"></img>
        </div>
    </div>)
}

export default NavBar