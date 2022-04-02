import { useContext, useState } from "react"
import { Form, Button, Alert } from 'react-bootstrap';
import { login } from '../../api/userAPI';
import UserContext from "../../user/UserContext";
import SessionContext from "../../session/SessionContext";



import Modal from "../../components/modal/Modal"
const LoginModal = (props) => {
    const { setUsername } = useContext(UserContext)
    const { setSession } = useContext(SessionContext)


    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const loginUser = async () => {

        setSuccessMsg("");
        setErrorMsg("");

        // call the backend
        const body = {
            "username": enteredUsername,
            "password": enteredPassword,
        }

        // send entered username and password to backend
        let response = await login(body);
        console.log(response)

        // if backend approves of the info
        if (response.message === "Login Successful") {
            setSuccessMsg(response.message)
            setUsername(enteredUsername)
            setSession(response.sessionID);

            setTimeout(() => {
                props.onCloseModal();

            }, 500)
            // if backend sends an error
        } else {
            setErrorMsg(response.error);
        }


    }

    return (<Modal onClosePasswordChange={props.onCloseModal}>
        <div style={{ "width": 600, "margin": "0 auto", "marginTop": 0 }}>
            <h2>Login</h2>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Enter Username</Form.Label>
                <Form.Control type="text" onChange={(event) => setEnteredUsername(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Enter Password</Form.Label>
                <Form.Control type="password" onChange={(event) => setEnteredPassword(event.target.value)} />
            </Form.Group>
            <Button onClick={loginUser}>Login</Button>
            <br />
            {errorMsg !== "" && <Alert variant="danger" style={{ "marginTop": 20 }} key={errorMsg}>{errorMsg}</Alert>}
            {successMsg !== "" && <Alert variant="success" style={{ "marginTop": 20 }} key={successMsg}>{successMsg}</Alert>}
        </div>
    </Modal >)
}

export default LoginModal