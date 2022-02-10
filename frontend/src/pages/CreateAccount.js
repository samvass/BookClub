import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createAccount } from '../api/userAPI';

const CreateAccountPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const signup = (event) => {
        event.preventDefault();
    
        // call the backend
        const body = {
            "username": username,
            "password": password,
            "email": email
        }

        let response = createAccount(body);

        console.log(response);
    }

    return <div style={{ "width": 600, "margin": "0 auto", "marginTop": 30 }}>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                value={email} onChange={(event) => setEmail(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username"
                value={username} onChange={(event) => setUsername(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                value={password} onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={signup}>
                Submit
            </Button>
        </Form>
    </div>
}

export default CreateAccountPage;