import React from 'react'
import Button from '@mui/material/Button';
import './LandingPage.css'
import Spline from '@splinetool/react-spline';
import { BsSpotify, BsMusicNoteBeamed, BsYoutube } from 'react-icons/bs'
import { landingPage } from '../../Constants/Labels'
import { useNavigate } from 'react-router-dom';
import { SIGN_UP_HREF } from '../../Constants/Navigation';

const LandingPage = () => {
    
    const navigate = useNavigate()

    const loginRedirect = () => {
        navigate(SIGN_UP_HREF)
    }

  return (
    <div className='landing-page'>
        <div className='header-section'>

            <div className='header'>{landingPage.HEADER}</div>
            
            <div className='subheader'>{landingPage.SUBHEADER}</div>
        </div>

        <br />
        <br />

        <Spline scene="https://prod.spline.design/qGqAtzDH1D2Gww5r/scene.splinecode" />

        <div className='button-section'>
            <Button variant="contained" size="large" style={{backgroundColor: '#050C4E', color: '#EDEDED'}} onClick={loginRedirect}>
                {landingPage.BUTTON}
            </Button>
        </div>

        <div className='description-section'>
            <div className='description'>{landingPage.DESCRIPTION}</div>
        </div>

    </div>
  )
}

export default LandingPage