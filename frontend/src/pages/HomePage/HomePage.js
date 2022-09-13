import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../Context/AuthContext';
import LandingPage from '../LandingPage/LandingPage';
import "./HomePage.css"


const HomePage = () => {

    const { token } = useContext(AuthContext)

    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {

      setIsAuth(token ? true : false)

    }, [token])
    
    return (
      <React.Fragment>

        {/* Render the regular home if user is authenticated */}
        {
        isAuth &&
          <div className='recommendation-section'>
              <div className='arrow reject'><button>Accept</button></div>
              <div className='book'></div>
              <div className='arrow accept'><button>Reject</button></div>
          </div>
        }

        {/* Render the landing page if user is not authenticated */}
        {
          !isAuth &&

          <LandingPage />

        }

      </React.Fragment>
    )
  }

export default HomePage;  