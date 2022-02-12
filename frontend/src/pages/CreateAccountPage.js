import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { createAccount } from '../api/userAPI';

const CreateAccountPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const emailHandler = (event) => {
        let typedEmail = event.target.value;

        setEmail(event.target.value)
    }

    const usernameHandler = (event) => {
        let typedUsername = event.target.value;

        setUsername(event.target.value)
    }

    const passwordHandler = (event) => {
        let typedPassword = event.target.value;

        setPassword(event.target.value)
    }

    const signup = async (event) => {
        event.preventDefault();

        // call the backend
        const body = {
            "username": username,
            "password": password,
            "email": email
        }
        
        const response = await createAccount(body);

        if (response.error.length > 0){
            setError(response.error);
        }
    }

    return <div>
        <div style={{ "width": 600, "margin": "0 auto", "marginTop": 30 }}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email"
                        value={email} onChange={emailHandler} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username"
                        value={username} onChange={usernameHandler} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={password} onChange={passwordHandler} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={signup}>
                    Create Account
                </Button>
            </Form>
            <br/>
            {error && error.map(err => {
            return <Alert variant="danger" key={err}>{err}</Alert>;
            })}
        </div>
    </div>
}

export default CreateAccountPage;