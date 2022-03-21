import { createContext } from "react";

const UserContext = createContext({
    username: "",
    setUsername: (username) => { }
});

export default UserContext;
