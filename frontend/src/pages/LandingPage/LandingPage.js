import React from 'react'
import Button from '@mui/material/Button';
import './LandingPage.css'
// import imageSrc from '../../images/unsplash_apcUIqOPEIo.png'
import { BsSpotify, BsMusicNoteBeamed, BsYoutube } from 'react-icons/bs'
import { landingPage } from '../../Constants/Labels'
import { useNavigate } from 'react-router-dom';
import { LOGIN_HREF } from '../../Constants/Navigation';

const LandingPage = () => {
    
    const navigate = useNavigate()

    const loginRedirect = () => {
        navigate(LOGIN_HREF)
    }

  return (
    <div className='landing-page'>
        <div className='header-section'>
            <div className='title'>{landingPage.TITLE}</div>

            <div className='header'>{landingPage.HEADER}</div>
            
            <div className='subheader'>{landingPage.SUBHEADER}</div>
        </div>

        <div className='button-section'>
            <Button variant="contained" size="large" style={{backgroundColor: '#050C4E', color: '#EDEDED'}} onClick={loginRedirect}>
                {landingPage.BUTTON}
            </Button>
        </div>

        <div className='description-section'>
            <div className='description'>{landingPage.DESCRIPTION}</div>
            {/* <img src={imageSrc}></img> */}
        </div>

    </div>
  )
}

export default LandingPage