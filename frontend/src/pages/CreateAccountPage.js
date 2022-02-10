import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createAccount } from '../api/userAPI';

const CreateAccountPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("error");

    const emailHandler = (event) => {
        let typedEmail = event.target.value;

        if (typedEmail.trim().length() === 0) {
            setError("Email cannot be empty")
            return;
        }

        setEmail(event.target.value)
    }

    const usernameHandler = (event) => {
        let typedUsername = event.target.value;
        console.log(typedUsername)

        if (typedUsername.trim().length() === 0) {
            setError("Username cannot be empty")
            return;
        }

        setUsername(event.target.value)
    }

    const passwordHandler = (event) => {
        let typedPassword = event.target.value;

        if (typedPassword.trim().length() === 0) {
            setError("Password cannot be empty")
            return;
        }

        setPassword(event.target.value)
    }

    const signup = (event) => {
        event.preventDefault();

        // call the backend
        const body = {
            "username": username,
            "password": password,
            "email": email
        }

        let response = createAccount(body);
        console.log(response)
    }

    return <div>
        <h1>{error}</h1>
        <div style={{ "width": 600, "margin": "0 auto", "marginTop": 30 }}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email"
                        value={email} onSubmit={emailHandler} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username"
                        value={username} onSubmit={usernameHandler} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={password} onSubmit={passwordHandler} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={signup}>
                    Create Account
                </Button>
            </Form>
        </div>
    </div>
}

export default CreateAccountPage;