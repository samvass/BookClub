import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { LOGIN_HREF } from '../../Constants/Navigation';
import AuthContext from '../../Context/AuthContext';

import "./HomePage.css"


const HomePage = () => {

    const navigate = useNavigate()
    const authState = useContext(AuthContext)

    useEffect(() => {
        if (!authState.token){
            navigate(LOGIN_HREF)
        }
    }, [])
    

    return (
      <div>
        <div className='recommendation-section'>
            <div className='arrow reject'><button>Accept</button></div>
            <div className='book'></div>
            <div className='arrow accept'><button>Reject</button></div>
        </div>
      </div>
    )
  }

export default HomePage;  