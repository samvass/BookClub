import { useState, useEffect, useContext } from 'react';
import { logout } from "../api/userAPI";
import { Navigate } from 'react-router-dom';
import UserContext from '../user/UserContext';


const LogoutPage = (props) => {
    const { username, setUsername } = useContext(UserContext);

    const [logoutSuccess, setLogoutSuccess] = useState(false);

    useEffect(async () => {
        if (username != "") {
            console.log(props.sessionID)
            await logout({}, props.sessionID);
            setUsername("")
            setLogoutSuccess(true);
        }
    }, [])

    return <div>
        {logoutSuccess && <Navigate to="/login" />}
    </div>
}

export default LogoutPage