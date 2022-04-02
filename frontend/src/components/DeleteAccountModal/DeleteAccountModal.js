import { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { login, deleteAccount } from "../../api/userAPI"
import { useNavigate } from 'react-router-dom';

import UserContext from '../../user/UserContext';
import SessionContext from "../../session/SessionContext"
import Modal from "../modal/Modal";

const DeleteAccountModal = (props) => {
    const { session, setSession } = useContext(SessionContext)
    const { username, setUsername } = useContext(UserContext)
    const navigate = useNavigate();

    const [enteredPassword, setEnteredPassword] = useState("");
    const [errors, setErrors] = useState("");

    const deleteAccountHandler = async () => {
        const body = {
            username: username,
            password: enteredPassword
        }

        const request = await login(body)
        console.log(request)

        if (request.message === "Login Successful") {
            const deleteAccountResponse = await deleteAccount(body, session);
            console.log(deleteAccountResponse)
            setUsername("");
            setSession("");
            navigate("/")
        } else {
            setErrors(request.error)
        }
    }

    return (
        <Modal onClosePasswordChange={props.setModalClose}>
            <h2>Delete Account</h2>
            <div>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control type="password" onChange={(event) => setEnteredPassword(event.target.value)} />
                </Form.Group>
                {errors !== "" && <Alert variant="danger" style={{ "marginTop": 20 }} key={errors}>{errors}</Alert>}
                <Button variant="light" onClick={props.setModalClose}>Cancel</Button>
                <Button variant="danger" onClick={deleteAccountHandler}>Confirm</Button>
            </div>
        </Modal >)
}

export default DeleteAccountModal;