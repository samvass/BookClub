import { createContext } from "react";

const SessionContext = createContext({
    token: "",
    user: {},
    setToken: (token) => {},
    setUser: (user) => {},
    logout: () => {}, 
});

export default SessionContext;
