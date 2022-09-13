import bookWorm from "../../images/bookworm.png"
import "./NavBar.css"
import { PAGES, PAGES_NON_AUTH, LOGIN_HREF } from '../../Constants/Navigation'

import AuthContext from '../../Context/AuthContext'
import { useNavigate } from "react-router-dom"

import { useContext, useState, useEffect } from "react"

const NavBar = () => {

    const navigate = useNavigate()
    const { logout, token } = useContext(AuthContext)
    const [pagesDisplayed, setPagesDisplayed] = useState(PAGES_NON_AUTH)

    const logoutUser = () => {
        logout()
        navigate(LOGIN_HREF)
    }

    useEffect(() => {

        // do not show unauthorized pages without a token
        setPagesDisplayed(token ? PAGES : PAGES_NON_AUTH)
    }, [token])
    
    return (
        <div className="header">
            <div className="logo-info">
                <h1>BookClub</h1>
                <img src={bookWorm} alt="Book Worm"></img>
                {pagesDisplayed.map((page, index) => {
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