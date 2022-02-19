import { useState } from 'react';

import "./PopOut.css"

const PopOut = (props) => {

    const [isSelected, setIsSelected] = useState(false);

    const menuClickHandler = () => {
        setIsSelected(!isSelected)
    }

    // return (<div>
    //     {!isSelected && <CgMenu id="menu-logo" onClick={menuClickHandler} />}
    //     {isSelected &&
    //         <div id="menu" onClick={menuClickHandler}>
    //             <Nav.Link as={Link} to="/" title="Home">
    //                 
    //             </Nav.Link>
    //             {props.loggedInUser !== "" && <Nav.Link as={Link} to="/myAccount" title="My Account">
    //                 My Account
    //             </Nav.Link>}
    //             {props.loggedInUser === "" && <Nav.Link as={Link} to="/signup" title="Create Account">
    //                 <MdOutlineCreate /> Create Account
    //             </Nav.Link>}
    //             {props.loggedInUser === "" &&
    //                 <Nav.Link as={Link} to="/login" title="Login">
    //                      Login
    //                 </Nav.Link>}
    //             {props.loggedInUser !== "" &&
    //                 <Nav.Link as={Link} to="/logout" title="Logout" >
    //                     <CgLogOut />Logout
    //                 </Nav.Link>}
    //         </div>}
    // </div>)

    return (
        <nav className='navbar'>
            <ul className='navbar-nav'>{props.children}</ul>
        </nav>)
}

export default PopOut