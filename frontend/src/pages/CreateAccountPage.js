import { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { createAccount, login } from '../api/userAPI';
import UserContext from '../user/UserContext';

const CreateAccountPage = () => {
    const { setUsername } = useContext(UserContext)

    const [enteredUsername, setEnteredUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState();
    const [successMsg, setSuccessMsg] = useState("");

    const emailHandler = (event) => {
        let typedEmail = event.target.value;
        setEmail(typedEmail);
    }

    const usernameHandler = (event) => {
        let typedUsername = event.target.value;
        setEnteredUsername(typedUsername);
    }

    const passwordHandler = (event) => {
        let typedPassword = event.target.value;
        setPassword(typedPassword);
    }

    const password2Handler = (event) => {
        let typedPassword2 = event.target.value;
        setPassword2(typedPassword2);
    }

    const signup = async (event, callback) => {
        event.preventDefault();

        if (password !== password2) {
            setErrorMsg(["Passwords do not match"])
            return
        }

        // call the backend
        const body = {
            "username": enteredUsername,
            "password": password,
            "email": email
        }


        const response = await createAccount(body);
        console.log(response)

        if (response.message === "Account successfully created") {
            setErrorMsg(null)

            console.log(body)
            const response1 = await login(body)
            console.log(response1)

            setUsername(enteredUsername)

            setTimeout(() => {
                setSuccessMsg(response1.message);
            }, 400)

        } else {
            setErrorMsg(response.error)
        }
    }


    let displayErrorMessages = []

    if (errorMsg) {
        displayErrorMessages = errorMsg.map((err) => {
            return <Alert variant="danger" key={err}>{err}</Alert>;
        })
    }



    return <div>
        <div style={{ "width": 600, "margin": "0 auto", "marginTop": 30 }}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                        value={email} onChange={emailHandler} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text"
                        value={enteredUsername} onChange={usernameHandler} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        value={password} onChange={passwordHandler} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Label>Re-Enter Password</Form.Label>
                    <Form.Control type="password"
                        value={password2} onChange={password2Handler} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={signup}>
                    Create Account
                </Button>
            </Form>
            <br />

            {errorMsg && displayErrorMessages}
            {successMsg !== "" && <Alert variant="success" key={successMsg}>{successMsg}</Alert>}
            {successMsg !== "" && <Navigate to="/setPreferences" />}
        </div>
    </div>
}

export default CreateAccountPage;