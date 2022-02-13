import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { login } from '../api/userAPI';

const LoginPage = () => {

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

        if (response.error.length > 0) {
            console.log("error")
            setError(response.error);
        } else {
            setSuccessMsg(response.message);
        }
    }

    return <div style={{ "width": 600, "margin": "0 auto", "marginTop": 30 }}>
        <Form>
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
        <br/>

        {successMsg && <Alert variant="success" key={successMsg}>{successMsg}</Alert>}
        {error && <Alert variant="danger" key={error}>{error}</Alert>}
    </div>
}

export default LoginPage;