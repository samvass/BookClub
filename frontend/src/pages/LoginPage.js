import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (event) => {
        event.preventDefault();

        // call the backend
        const body = {
            "username": username,
            "password": password,
        }

        // dont have method to sign in 
        // let response = signInAccount(body);
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

            <Button variant="primary" type="submit" onClick={signIn}>
                Login
            </Button>
        </Form>
    </div>
}

export default LoginPage;