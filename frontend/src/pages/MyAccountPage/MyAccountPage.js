import "./MyAccountPage.scss"
import { viewAccountByUserName } from "../../api/userAPI"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import PasswordChangeModal from "../PasswordChangeModal/PasswordChangeModal"
import { getPreferencesByUsername } from "../../api/userAPI"

const MyAccountPage = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([])
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [redirect, setRedirect] = useState(false)


    useEffect(async () => {
        if (props.loggedInUser.username !== "") {
            const incomingUserData = await viewAccountByUserName(props.loggedInUser, props.sessionID);
            console.log(incomingUserData)

            setUsername(incomingUserData.user.username)
            setEmail(incomingUserData.user.email)

            const incomingPreferences = await getPreferencesByUsername(props.loggedInUser)
            console.log(incomingPreferences.data)
            setSelectedGenres(incomingPreferences.data)
        }
    }, [])

    const openPasswordChanger = () => {
        setIsChangePasswordOpen(true);
    }

    const closePasswordChanger = () => {
        setIsChangePasswordOpen(false);
    }


    const displaySelectedGenres = selectedGenres.map((genre, index) => {
        return <div className="selected-item" key={index}>{genre}</div>
    })

    // const selectedAuthors = user.authors.map((author) => {
    //     return <div className="selected-item">{author}</div>
    // })

    const changeGenresHandler = () => {
        setRedirect(true)
    }

    return (
        <div className="text">
            {props.loggedInUser === "" ? <Navigate to="/login" /> : <div className="page">
                <div className="preferences">
                    <div className="display-properly">
                        <h1>Genres</h1>
                        <button id="password-button" onClick={changeGenresHandler}>Change Genres</button>
                    </div>
                    <div className="selected-items">
                        {displaySelectedGenres}
                    </div>
                    {/* <h1>Authors</h1>
                    <div className="selected-items">
                        {selectedAuthors}
                    </div> */}
                </div>
                <div className="account-info">
                    <h1>Account Info</h1>
                    <div>
                        <h3>Email</h3>
                        <h4>{email}</h4>
                    </div>
                    <div>
                        <h3>Username</h3>
                        <h4>{username}</h4>
                    </div>
                    <button id="password-button" onClick={openPasswordChanger}>Change Password</button>
                </div>
            </div>}
            {isChangePasswordOpen && <PasswordChangeModal onClosePasswordChange={closePasswordChanger} />}
            {redirect && <Navigate to="/setPreferences" />}
        </div>
    )

}

export default MyAccountPage