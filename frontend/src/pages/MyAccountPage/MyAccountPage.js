import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_HREF } from "../../Constants/Navigation";
import { Typography, AccordionDetails, Accordion, AccordionSummary } from "@mui/material";
import AuthContext from "../../Context/AuthContext";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountInfo from "../../components/AccountInfo/AccountInfo";

import "./MyAccountPage.css";

const MyAccountPage = () => {
  const navigate = useNavigate();
  const authState = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  useEffect(async () => {
    if (!authState.token) {
      navigate(LOGIN_HREF);
    }

    
  }, []);

  const navigateToPreferences = () => {
    navigate("/setPreferences")
  }


  return (
    <div className="account-page">

        <Accordion
        defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{'color': '#EDEDED'}} />}
            sx={{
              'backgroundColor': '#266DD3',
              'color': '#EDEDED',
              'justifyContent': 'center'
            }}
          >
            <Typography align="center" sx={{width: '100%'}}>My Preferences</Typography>
          </AccordionSummary>
          <AccordionDetails
          sx={{
            'backgroundColor': '#433A3F',
            'color': '#EDEDED',
          }}>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{'color': '#EDEDED'}} />}
            sx={{
              'backgroundColor': '#266DD3',
              'color': '#EDEDED',
            }}
          >
            <Typography align="center" sx={{width: '100%'}}>Account Info</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              'backgroundColor': '#433A3F',
              'color': '#EDEDED',
            }}
          >
            <AccountInfo />
          </AccordionDetails>
        </Accordion>
    </div>
  );
};

export default MyAccountPage;
