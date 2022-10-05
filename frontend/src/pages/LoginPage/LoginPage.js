import { login } from '../../api/userAPI';
import React, { useContext, useEffect } from 'react'
import { HOME_HREF } from "../../Constants/Navigation";
import { LOGIN_SCHEMA } from '../../Constants/Schema'
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../Context/AuthContext";
import UserInfoForm from "../../components/UserInfoForm/UserInfoForm";
import "./LoginPage.css"

export const LoginPage = () => {

  const authState = useContext(AuthContext)
  const navigate = useNavigate();

      const onSubmitHandler = async (data) => {

        console.log(data)

        const body = {
          "username": data.username,
          "password": data.password,
      }

        const response = await login(body)
        console.log(response)      
      
        // if backend approves of the info
        if (response.data) {
          console.log(authState)
          const sessionInfo = { username : response.data.username, token: response.data.token}
          authState.setToken(sessionInfo)
        }
      }

      useEffect(() => {
        if (authState.token) {
            navigate(HOME_HREF)
        }
      }, [authState.token])
      

  return (
    <div className="login-form">
      <UserInfoForm schema={LOGIN_SCHEMA} 
      onSubmit={onSubmitHandler} 
      submitLabelText="login" />
    </div>
  )
}

export default LoginPage;