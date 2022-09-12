import { createContext } from "react";

const AuthContext = createContext({
    token: "",
    user: {},
    setToken: (token) => {},
    setUser: (user) => {},
    logout: () => {}, 
});

export default AuthContext;
