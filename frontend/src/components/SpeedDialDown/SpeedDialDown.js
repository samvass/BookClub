import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import UserContext from '../../user/UserContext';
import { useNavigate } from 'react-router-dom';

import { AiOutlineHome } from 'react-icons/ai';
import { CgLogIn, CgLogOut } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { ImBooks } from 'react-icons/im';
import { useContext } from 'react';


export default function BasicSpeedDial() {
    let actions = null;
    const navigate = useNavigate();

    const { username } = useContext(UserContext);

    if (username === "") {
        actions = [
            { icon: <AiOutlineHome size={30} />, name: 'Home', link: "/" },
            { icon: <CgLogIn size={30} />, name: 'Login', link: "/login" },
        ];
    } else {
        actions = [
            { icon: <AiOutlineHome size={30} />, name: 'Home', link: "/" },
            { icon: <ImBooks size={30} />, name: 'My Library', link: "/mylibrary" },
            { icon: <FiSettings size={30} />, name: 'My Account', link: "/myaccount" },
            { icon: <CgLogOut size={30} />, name: 'Log Out', link: "/logout" },
        ];
    }

    const routeChange = (link) => {
        navigate(link);
    }

    return (
        <Box sx={{ height: 50, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 0, left: 5 }}
                icon={<SpeedDialIcon />}
                direction={"right"}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        onClick={() => {
                            routeChange(action.link);
                        }}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}

            </SpeedDial>
        </Box>

    );
}


