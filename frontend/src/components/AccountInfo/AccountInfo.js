import {React, useState, useContext, useEffect} from 'react'
import { Button } from '@mui/material';
import AuthContext from "../../Context/AuthContext";
import { updateUserInfo } from '../../api/userAPI';

import './AccountInfo.css'

const AccountInfo = () => {

    const { user } = useContext(AuthContext);

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [hasUpdatedField, setHasUpdatedField] = useState(false)

    const updatedFieldHandler = (event) => {

        const fieldName = event.target.name
        const fieldValue = event.target.value

        switch (fieldName) {
            case 'username':
                setUsername(fieldValue)
                break;
            case 'email':
                setEmail(fieldValue)
                break;
            default:
                break;
        }
        if (!hasUpdatedField){
            setHasUpdatedField(true)
        }
    }

    const updateUserInfo = async event => {
        
        if (!hasUpdatedField){
            // cannot update if the fields are unchanged...
            return
        }

        const body = {
            username: username,
            email: email,
        }

        const res = await updateUserInfo(user.user._id, body)

        console.log(res)

    }

    useEffect(() => {
        const {username, email, password} = user.user
        setUsername(username)
        setEmail(email)
    }, [])

    const updatedButtonStyling = {
        'color': '#EDEDED', 
        'backgroundColor': '#329654',
        'margin': '30px 200px 30px 200px',
        'height': '70px',
        '&:hover': {
            'backgroundColor': '#619D75'
        }
    }

    const defaultButtonStyling = {
        'color': '#EDEDED', 
        'backgroundColor': '#266DD3',
        'margin': '30px 200px 30px 200px',
        'height': '70px',
        '&:hover': {
            'backgroundColor': '#266DD3'
        }
    }
    

    return (
    <form className='account-form'>
        <div className='fields'>
            <div className="field">
                <div className="input-header">Username</div>
                <input className='input-field'
                name='username' 
                value={username}
                type='text'
                onChange={updatedFieldHandler}></input>
            </div>
            <div className="field">
                <div className="input-header">Email</div>
                <input className='input-field' 
                name='email'
                type='text'
                value={email}
                onChange={updatedFieldHandler}></input>
            </div>
        </div>

        <Button type="submit"
        sx={hasUpdatedField ? updatedButtonStyling : defaultButtonStyling}
        onClick={updateUserInfo}
        >
            Update Account Info
        </Button>
    </form>
  )
}

export default AccountInfo