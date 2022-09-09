import { createContext } from "react";

const SessionContext = createContext({
    session: "",
    setSession: (sessionId) => { }
});

export default SessionContext;
