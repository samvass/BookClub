import "./MyAccountPage.scss"
import { viewAccountByUserName } from "../../api/userAPI"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

const MyAccountPage = (props) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(async () => {
        if (props.loggedInUser !== "") {
            const incomingUserData = await viewAccountByUserName(props.loggedInUser)
            console.log(incomingUserData)

            setUsername(incomingUserData.user.username)
            setEmail(incomingUserData.user.email)
        }
    }, [])

    return (
        <div className="text">
            {props.loggedInUser === "" ? <Navigate to="/login" /> : <div>
                <h1>Account Info</h1>
                <div>
                    <h3>Email</h3>
                    <h4>{email}</h4>
                </div>
                <div>
                    <h3>Username</h3>
                    <h4>{username}</h4>
                </div></div>}
        </div>
    )

}

export default MyAccountPage