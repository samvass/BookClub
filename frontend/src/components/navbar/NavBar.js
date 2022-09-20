import bookWorm from "../../images/bookworm.png"
import "./NavBar.css"
import { PAGES, PAGES_NON_AUTH, LOGIN_HREF } from '../../Constants/Navigation'

import AuthContext from '../../Context/AuthContext'
import { useNavigate } from "react-router-dom"

import { useContext, useState, useEffect } from "react"
import { Button } from "@mui/material"

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
        <div className="navbar">
            <div className="logo-info">
                <h1 className="name">BookClub</h1>
            </div>
            <div className="navigation-links">
                {pagesDisplayed.map((page, index) => {
                    const link = page.href
                    return (
                        <Button key={index} size="large" style={{color: '#EDEDED'}} 
                        onClick={() => navigate(link)}>{page.name}</Button>
                    )
                })}
                {token && <Button style={{color: '#EDEDED'}} onClick={logoutUser}>Logout</Button>}
                
            </div>
        </div >
        )
}

export default NavBar