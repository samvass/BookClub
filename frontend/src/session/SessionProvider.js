import SessionContext from "./SessionContext"
import { useState } from 'react';


const SessionProvider = (props) => {
    const [session, setSession] = useState("");

    return (
        <SessionContext.Provider value={{ session, setSession }}>
            {props.children}
        </SessionContext.Provider>)
}

export default SessionProvider