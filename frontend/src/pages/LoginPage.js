import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { login } from '../api/userAPI';
import { Navigate } from "react-router-dom"

const LoginPage = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const loginUser = async (event) => {
        event.preventDefault();

        setSuccessMsg("");
        setError("");

        // call the backend
        const body = {
            "username": username,
            "password": password,
        }

        let response = await login(body);

        props.setUserLoggedIn(username)
    }

    console.log(props.loggedInUser)

    return <div style={{ "width": 600, "margin": "0 auto", "marginTop": 30 }}>

        {props.loggedInUser !== "" ? <Navigate to="/" /> : <div><Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
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

            {successMsg && <Alert variant="success" key={successMsg}>{successMsg}</Alert>}
            {error && <Alert variant="danger" key={error}>{error}</Alert>}</div>}
    </div>
}

export default LoginPage;