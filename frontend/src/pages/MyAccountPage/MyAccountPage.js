import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { LOGIN_HREF } from '../../Constants/Navigation';
import SessionContext from '../../Context/SessionContext';

import "./MyAccountPage.css"

const MyAccountPage = () => {

  const navigate = useNavigate()
  const sessionState = useContext(SessionContext)

  useEffect(() => {
      if (!sessionState.token){
          navigate(LOGIN_HREF)
      }
  }, [])

  return (
    <div>
        <div>username</div>
        <div>email</div>
        <div>preferences</div>
        <div>changes password button</div>
    </div>
  )
}

export default MyAccountPage