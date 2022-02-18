import { useEffect, useState } from "react";
import { BsFilterLeft } from 'react-icons/bs';
import "./PopUp.css"

const PopUp = () => {

    const [isOpen, setIsOpen] = useState(false);

    const menuHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="container">
            <button onClick={menuHandler}><BsFilterLeft /></button>
            {isOpen && <nav className="menu">
                <div className="link-list">
                    <a href="/"><span>Home</span></a>
                    <a href="/my-library"><span>My Library</span></a>
                    <a href="/my-account"><span>My Account</span></a>
                </div>
            </nav>}
        </div >)
}

export default PopUp;