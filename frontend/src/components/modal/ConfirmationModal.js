import { useState } from 'react';
import Modal from "../../components/modal/Modal";
import { Form, Button, Alert } from 'react-bootstrap';
import { login } from "../../api/userAPI"


const ConfirmationModal = ({ title, confirmCallback, setModalClose, loggedInUser }) => {
    const [enteredPassword, setEnteredPassword] = useState("");
    const [errors, setErrors] = useState("");

    const deleteAccountHandler = async () => {

        const body = {
            username: loggedInUser,
            password: enteredPassword
        }

        const request = await login(body)

        if (request.message === "Login Successful") {
            confirmCallback()
        } else {
            setErrors(request.error)
        }
    }

    return (<Modal onClosePasswordChange={setModalClose}>
        <h2>{title}</h2>
        <div>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Enter your password</Form.Label>
                <Form.Control type="password" onChange={(event) => setEnteredPassword(event.target.value)} />
            </Form.Group>
            {errors !== "" && <Alert variant="danger" style={{ "marginTop": 20 }} key={errors}>{errors}</Alert>}
            <Button variant="light" onClick={setModalClose}>Cancel</Button>{' '}
            <Button variant="danger" onClick={deleteAccountHandler}>Confirm</Button>{' '}
        </div>
    </Modal >)
}

export default ConfirmationModal;