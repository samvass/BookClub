import UserContext from "./UserContext"
import { useState } from 'react';


const UserProvider = (props) => {
    const [username, setUsername] = useState("");

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {props.children}
        </UserContext.Provider>)
}

export default UserProvider