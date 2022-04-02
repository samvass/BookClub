import "./MyAccountPage.scss"
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { getPreferencesByUsername, getUserByUserName } from "../../api/userAPI"

import PasswordChangeModal from "../PasswordChangeModal/PasswordChangeModal"
import DeleteAccountModal from "../../components/DeleteAccountModal/DeleteAccountModal"
import UserContext from '../../user/UserContext';
import SessionContext from "../../session/SessionContext"


const MyAccountPage = () => {
    const { username } = useContext(UserContext);
    const { session } = useContext(SessionContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [selectedGenres, setSelectedGenres] = useState([])
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);


    useEffect(async () => {
        if (username === "") {
            navigate("/login")
        }
        console.log(username)
        console.log(session)
        const incomingUserData = await getUserByUserName(username);

        console.log(incomingUserData)
        setEmail(incomingUserData.user.email)

        const incomingPreferences = await getPreferencesByUsername(username)
        setSelectedGenres(incomingPreferences.data)
    }, [])

    const displaySelectedGenres = selectedGenres.map((genre, index) => {
        return <div className="selected-item" key={index}>{genre}</div>
    })

    return (
        <div className="text">
            <div className="page">
                <div className="preferences">
                    <div className="display-properly">
                        <h1>Genres</h1>
                        <button className="password-button" id="password-button" onClick={() => { navigate("/setPreferences") }}>Change Genres</button>
                    </div>
                    <div className="selected-items">
                        {displaySelectedGenres}
                    </div>
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
                    <button className="password-button" onClick={() => { setIsChangePasswordOpen(true) }}>Change Password</button>
                    <button className="password-button" onClick={() => setDeleteAccountOpen(true)}>Delete Account</button>
                </div>
            </div>
            {isChangePasswordOpen && <PasswordChangeModal onClosePasswordChange={() => { setIsChangePasswordOpen(false) }} />}
            {deleteAccountOpen && <DeleteAccountModal setModalClose={() => setDeleteAccountOpen(false)} />}
        </div>
    )

}

export default MyAccountPage