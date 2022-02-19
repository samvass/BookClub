import NavBar from "../../components/navbar/NavBar"
import woodshelf from "../../images/woodshelf.png"
import "./MyLibraryPage.css"

const MyLibraryPage = () => {

    return (<div className="myLibrary">
        <h1 className="myLibraryTitle">My Library</h1>
        <img src={woodshelf} className="shelf" alt="Wood Shelf"></img>
        <img src={woodshelf} className="shelf" alt="Wood Shelf"></img>
    </div>)
}

export default MyLibraryPage