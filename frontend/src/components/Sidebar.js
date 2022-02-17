import React from 'react'
import {elastic as Menu} from 'react-burger-menu';

import './Sidebar.css';

const Sidebar = () => {
  return (
    <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/signup">Create Account</a>
        <a id="contact" className="menu-item" href="/login">Login</a>
        <a id="contact" className="menu-item" href="/logout">Logout</a>
    </Menu>
  )
}

export default Sidebar;