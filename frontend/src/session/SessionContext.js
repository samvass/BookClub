import { createContext } from "react";

const SessionContext = createContext({
    session: "",
    setUsername: (sessionId) => { }
});

export default SessionContext;
