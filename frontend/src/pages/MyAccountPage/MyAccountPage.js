import "./MyAccountPage.scss"
import { viewAccountByUserName } from "../../api/userAPI"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import PasswordChangeModal from "../PasswordChangeModal/PasswordChangeModal"

const MyAccountPage = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    useEffect(async () => {
        if (props.loggedInUser !== "") {
            const incomingUserData = await viewAccountByUserName(props.loggedInUser)
            console.log(incomingUserData)

            setUsername(incomingUserData.user.username)
            setEmail(incomingUserData.user.email)
        }
    }, [])

    const openPasswordChanger = () => {
        setIsChangePasswordOpen(true);
    }

    const closePasswordChanger = () => {
        setIsChangePasswordOpen(false);
    }


    return (
        <div className="text">
            {props.loggedInUser === "" ? <Navigate to="/login" /> : <div className="page">
                <div className="preferences">
                    <h1>Genres</h1>
                    <h1>Authors</h1>
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
        </div>
    )

}

export default MyAccountPage