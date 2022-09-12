import bookWorm from "../../images/bookworm.png"
import "./NavBar.css"
import { PAGES } from '../../Constants/Navigation'
import { LOGIN_HREF } from '../../Constants/Navigation'

import AuthContext from '../../Context/AuthContext'
import { useNavigate } from "react-router-dom"

import { useContext } from "react"

const NavBar = () => {

    const navigate = useNavigate()
    const { logout } = useContext(AuthContext)

    const logoutUser = () => {
        logout()
        navigate(LOGIN_HREF)
    }

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
                <button onClick={logoutUser}>Logout</button>
            </div>
        </div >
        )
}

export default NavBar