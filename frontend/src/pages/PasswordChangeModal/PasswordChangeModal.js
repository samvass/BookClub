import { useState } from "react"
import { Form, Button, Alert } from 'react-bootstrap';

import Modal from "../../components/modal/Modal"
const PasswordChangeModal = (props) => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const changePasswordHandler = () => {
        //use backend to change the password
        if (newPassword !== newPassword2) {
            setErrorMsg("Passwords do not match")
            return
        }

        // see if old password is user's password
        // if ()

        props.onClosePasswordChange()
    }

    return (<Modal onClosePasswordChange={props.onClosePasswordChange}>
        <div style={{ "width": 600, "margin": "0 auto", "marginTop": 0 }}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Enter old password</Form.Label>
                <Form.Control type="password" onChange={(event) => setOldPassword(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Enter new password</Form.Label>
                <Form.Control type="password" onChange={(event) => setNewPassword(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Re-enter new password</Form.Label>
                <Form.Control type="password" onChange={(event) => setNewPassword2(event.target.value)} />
            </Form.Group>
            <Button onClick={changePasswordHandler}>Change</Button>
            <br />
            {errorMsg !== "" && <Alert variant="danger" style={{ "marginTop": 20 }} key={errorMsg}>{errorMsg}  </Alert>}
        </div>
    </Modal >)
}

export default PasswordChangeModal