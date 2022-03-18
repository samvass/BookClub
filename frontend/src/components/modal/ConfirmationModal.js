import React from 'react';
import Modal from "../../components/modal/Modal";
import { Button } from 'react-bootstrap';

const ConfirmationModal = ({ title, confirmCallback, setModalClose }) => {
    return (<Modal onClosePasswordChange={setModalClose}>
        <div>{title}</div>
        <div>
            <Button variant="light" onClick={setModalClose}>Cancel</Button>{' '}
            <Button variant="danger" onClick={confirmCallback}>Confirm</Button>{' '}
        </div>
    </Modal >)
}

export default ConfirmationModal;