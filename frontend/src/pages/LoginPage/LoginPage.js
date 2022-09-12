import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccount, login } from '../../api/userAPI';
import React, { useContext, useEffect } from 'react'

import { LOGIN_SCHEMA } from '../../Constants/Schema'
import { useNavigate } from 'react-router-dom';


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
          console.log("hi there")
          // if backend sends an error
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
    <div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <input {...register("username")} placeholder="username" type="text" />
            <p>{errors.username?.message}</p>
            <input {...register("password")} placeholder="password" type="password"  />
            <p>{errors.password?.message}</p>
            <button type="submit">Sign In</button>
        </form>
    </div>
  )
}

export default LoginPage;