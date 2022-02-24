import React, { useState, useEffect } from 'react';
import { logout } from "../api/userAPI";
import { Navigate } from 'react-router-dom';

const LogoutPage = (props) => {
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    useEffect(async () => {
        if (props.loggedInUser != ""){
            console.log(props.sessionID)
            await logout({}, props.sessionID);
            props.setUserLoggedIn("")
            setLogoutSuccess(true);
        }
    }, [])

    return <div>
        {logoutSuccess && <Navigate to="/login" />}
    </div>
}

export default LogoutPage