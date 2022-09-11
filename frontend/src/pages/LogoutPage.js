import { useEffect, useContext } from 'react';
import SessionContext from '../Context/SessionContext';
import { useNavigate } from 'react-router-dom';

const LogoutPage = (props) => {
    //const { username, setUsername } = useContext(UserContext);
    const {token, logout, } = useContext(SessionContext);
    const navigate = useNavigate();

    useEffect(async () => {
        if ( token != "") {
            //await logout({}, session); logout is not yet implemented in the controller
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('username');
            logout()
            navigate("/login")
        }
    }, [])

    return <div>
     {/* {logoutSuccess && <Navigate to="/login" />} */}
    </div>
}

export default LogoutPage