import { Form, Button, Alert } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { login } from '../../api/userAPI';
import { Navigate, useNavigate } from "react-router-dom"
import UserContext from '../../user/UserContext';
import SessionContext from '../../Context/SessionContext';
import TokenContext from '../../Context/TokenContext';

import "./LoginPage.css"

const LoginPage = () => {


    const [enteredUsername, setEnteredUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [redirectMsg, setRedirectMsg] = useState(false);

    const tokenState = useContext(TokenContext)

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

            tokenState.setToken(response.data.token)


            setSuccessMsg(response.message)

            console.log(username)

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
            {tokenState.token !== "" ? <Navigate to="/" /> : <div><Form>
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