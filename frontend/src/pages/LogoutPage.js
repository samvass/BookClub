import { logout } from "../api/userAPI"

const LogoutPage = async (props) => {
    if (props.loggedInUser !== "") {
        props.setUserLoggedIn("")

        await logout({})

        window.location.href = "/";
    } else {
        window.location.href = "/login";
    }
}

export default LogoutPage