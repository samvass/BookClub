import { createContext } from "react";

const UserContext = createContext({
    user: {},
    setUser: (user) => { }
});

export default UserContext;
