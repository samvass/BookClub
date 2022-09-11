import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccount, login } from '../../api/userAPI';
import React, { useContext, useEffect } from 'react'

import { LOGIN_SCHEMA } from '../../Constants/Schema'
import { useNavigate } from 'react-router-dom';


import "./LoginPage.css"
import SessionContext from "../../Context/SessionContext";

export const LoginPage = () => {

  const sessionState = useContext(SessionContext)
  const navigate = useNavigate();


    const { register, handleSubmit, formState: { errors }, reset,  } = useForm({
        resolver: yupResolver(LOGIN_SCHEMA),
      });

      const onSubmitHandler = async (data) => {
        console.log({data});

        const body = {
          "username": data.username,
          "password": data.password,
          "email": data.email
      }

          const response = await login(body)
          console.log(response)      
      
        // if backend approves of the info
        if (response.message === "Login Successful") {
          console.log("k the login worked")
          console.log(response)
          console.log(sessionState)
          const sessionInfo = { "username" : response.data.username, "token": response.data.token}
          sessionState.setToken(sessionInfo)
          console.log("hi there")
          // if backend sends an error
      }
        //reset(); //this is to reset the inputs
      }

      console.log(errors)

      useEffect(() => {
        if (sessionState.token) {
            navigate("/")
        }
      }, [sessionState.token])
      

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