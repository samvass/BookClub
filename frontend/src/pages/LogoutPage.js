import { useState, useEffect, useContext } from 'react';
import { logout } from "../api/userAPI";
import { Navigate } from 'react-router-dom';
import UserContext from '../user/UserContext';
import SessionContext from '../session/SessionContext';


const LogoutPage = (props) => {
    const { username, setUsername } = useContext(UserContext);
    const { session } = useContext(SessionContext);

    const [logoutSuccess, setLogoutSuccess] = useState(false);

    useEffect(async () => {
        if (username != "") {
            console.log(session)
            await logout({}, session);
            setUsername("")
            setLogoutSuccess(true);
            sessionStorage.removeItem('sessionID');
            sessionStorage.removeItem('username');
        }
    }, [])

    return <div>
        {logoutSuccess && <Navigate to="/login" />}
    </div>
}

export default LogoutPage