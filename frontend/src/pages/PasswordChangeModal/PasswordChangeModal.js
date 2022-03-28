import { useState, useContext } from "react"
import { Form, Button, Alert } from 'react-bootstrap';
import { changePassword } from "../../api/userAPI";
import SessionContext from "../../session/SessionContext";

import Modal from "../../components/modal/Modal"
const PasswordChangeModal = (props) => {
    const { session, setSession } = useContext(SessionContext)

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [errors, setErrors] = useState([]);

    const changePasswordHandler = async () => {
        //use backend to change the password
        const body = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            newPassword2: newPassword2
        }

        const res = await changePassword(body, session);
        if (res.error.length !== 0) {
            setErrors(res.error);
            return;
        }

        props.onClosePasswordChange()
    }

    return (<Modal onClosePasswordChange={props.onClosePasswordChange}>
        <div style={{ "width": 600, "margin": "0 auto", "marginTop": 0 }}>
            <h2>Change Password</h2>
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
            {errors.length !== 0 && errors.map((err) => {
                return <Alert variant="danger" style={{ "marginTop": 20 }} key={err}>{err}</Alert>;
            })}
        </div>
    </Modal >)
}

export default PasswordChangeModal