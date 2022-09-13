import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccount, login } from '../../api/userAPI';
import React, { useContext, useEffect } from 'react'

import { LOGIN_SCHEMA } from '../../Constants/Schema'
import { useNavigate } from 'react-router-dom';

import { Button } from "@mui/material";


import "./LoginPage.css"
import AuthContext from "../../Context/AuthContext";

export const LoginPage = () => {

  const authState = useContext(AuthContext)
  const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors }, reset,  } = useForm({
        resolver: yupResolver(LOGIN_SCHEMA),
      });

      const onSubmitHandler = async (data) => {
        console.log({data});

        const body = {
          "username": data.username,
          "email": data.email, // do we need email?
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
        //reset(); //this is to reset the inputs
      }

      console.log(errors)

      useEffect(() => {
        if (authState.token) {
            navigate("/")
        }
      }, [authState.token])
      

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmitHandler)}>
        <ul className="login">
          <li className="input">
              <p className="input-header">What's Your Username?</p>
              <input className="input-field" {...register("username")} placeholder="Enter your username." type="text" />
              <p className="validation-error">{errors.username?.message}</p>
          </li>
          <li className="input">
            <p className="input-header">What's Your Password?</p>
            <input className="input-field" {...register("password")} placeholder="Enter your password." type="password"  />
            <p className="validation-error">{errors.password?.message}</p>
          </li>

          <li>
            <Button type="submit" style={{color: '#EDEDED', backgroundColor: '#050C4E'}}>Sign In</Button>
          </li>
        </ul>
    </form>
  )
}

export default LoginPage;