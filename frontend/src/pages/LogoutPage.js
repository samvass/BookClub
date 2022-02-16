import React, { useState, useEffect } from 'react';
import { logout } from "../api/userAPI";
import { Navigate } from 'react-router-dom';

const LogoutPage = (props) => {
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    useEffect(async () => {
        if (props.loggedInUser !== "") {
            await props.setUserLoggedIn("")
            await logout({})
        }
        setLogoutSuccess(true);
    }, [])

    return <div>
        {logoutSuccess && <Navigate to="/login" />}
    </div>
}

export default LogoutPage