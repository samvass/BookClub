import { Form, Button, Alert } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { login } from '../api/userAPI';
import { Navigate } from "react-router-dom"
import UserContext from '../user/UserContext';

const LoginPage = (props) => {
    const { setUsername, username } = useContext(UserContext);

    const [enteredUsername, setEnteredUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

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
            props.setSessionID(response.sessionID);

            setUsername(enteredUsername)

            // if backend sends an error
        } else {
            setErrorMsg(response.error);
        }

    }

    return <div>
        <div style={{ "width": 600, "margin": "0 auto", "marginTop": 30 }}>
            {username !== "" ? <Navigate to="/" /> : <div><Form>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={(event) => setEnteredUsername(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={loginUser}>
                    Login
                </Button>
            </Form>
                <br />
                {successMsg !== "" && <Alert variant="success" key={successMsg}>{successMsg}</Alert>}
                {errorMsg !== "" && <Alert variant="danger" key={errorMsg}>{errorMsg}</Alert>}</div>}
        </div>
    </div>
}

export default LoginPage;