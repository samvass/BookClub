import bookWorm from "../../images/bookworm.png"
import "./NavBar.css"
import { PAGES } from '../../Constants/Navigation'

import SpeedDialDown from "../SpeedDialDown/SpeedDialDown"
import { useNavigate } from "react-router-dom"

const NavBarOld = () => {

    return (
        <div className="header">
            <div className="logo-info">
                <h1>BookClub</h1>
                <img src={bookWorm} alt="Book Worm"></img>
            </div>
            <SpeedDialDown />
        </div >)
}

const NavBar = () => {

    const navigate = useNavigate()

    return (
        <div className="header">
            <div className="logo-info">
                <h1>BookClub</h1>
                <img src={bookWorm} alt="Book Worm"></img>
                {PAGES.map((page, index) => {
                    const link = page.href
                    return (
                        <button key={index} onClick={() => navigate(link)}>{page.name}</button>
                    )
                })}
            </div>
        </div >
        )
}

export default NavBar