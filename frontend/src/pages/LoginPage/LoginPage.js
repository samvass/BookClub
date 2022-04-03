import { Form, Button, Alert } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { login } from '../../api/userAPI';
import { Navigate, useNavigate } from "react-router-dom"
import UserContext from '../../user/UserContext';
import SessionContext from '../../session/SessionContext';

import "./LoginPage.css"

const LoginPage = () => {
    const { setUsername, username } = useContext(UserContext);
    const { setSession } = useContext(SessionContext);

    const navigate = useNavigate();

    const [enteredUsername, setEnteredUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [redirectMsg, setRedirectMsg] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('username')) {
            navigate("/")
        }
    }, [])

    const loginUser = async (event) => {
        event.preventDefault();

        setSuccessMsg("");
        setErrorMsg("");

        // call the backend
        const body = {
            "username": enteredUsername,
            "password": password,
        }

        // send entered username and password to backend
        let response = await login(body);

        // if backend approves of the info
        if (response.message === "Login Successful") {
            setSuccessMsg(response.message)
            setSession(response.sessionID);
            sessionStorage.setItem('sessionID', response.sessionID);
            sessionStorage.setItem('username', enteredUsername);

            console.log("seeting username to " + enteredUsername)
            setUsername(enteredUsername)

            // if backend sends an error
        } else {
            setErrorMsg(response.error);
        }

    }

    const redirectToCreateAccountPage = () => {
        setRedirectMsg(true)
    }

    return <div>
        <div style={{ "width": 600, "margin": "0 auto", "marginTop": 30 }}>
            {username !== "" ? <Navigate to="/" /> : <div><Form>
                <Form.Group className="mb-3 input-lg" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" onChange={(event) => setEnteredUsername(event.target.value)} />
                </Form.Group>

                <Form.Group className="last-input" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>

                <div className="under-input">
                    <Button variant="primary" type="submit" onClick={loginUser}>
                        Login
                    </Button>
                    <div className="create-account-link" onClick={redirectToCreateAccountPage}>Create an account</div>
                </div>

            </Form>
                <br />
                {successMsg !== "" && <Alert variant="success" key={successMsg}>{successMsg}</Alert>}
                {errorMsg !== "" && <Alert variant="danger" key={errorMsg}>{errorMsg}</Alert>}</div>}
            {redirectMsg && <Navigate to="/signup" />}
        </div>
    </div>
}

export default LoginPage;