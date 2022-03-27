import bookWorm from "../../images/bookworm.png"
import "./NavBar.css"

import SpeedDialDown from "../SpeedDialDown/SpeedDialDown"

let toggleBtn = document.getElementById("toggle-btn");
let menuItems = document.querySelectorAll(".menu a");
let menuActive = false;

const NavBar = () => {

    toggleBtn.addEventListener("click", () => {
        if (!menuActive) {
          menuItems[0].style.transform = "translate(150px,0)";
          menuItems[1].style.transform = "translate(150px,90px)";
          //menuItems[2].style.transform = "translate(90px,150px)";
          //menuItems[3].style.transform = "translate(0,150px)";
          menuActive = true;
          toggleBtn.classList.add("active");
        } else {
          menuItems.forEach((menuItem) => {
            menuItem.style.transform = "translate(0,0)";
          });
          menuActive = false;
          toggleBtn.classList.remove("active");
        }
      })

    return (
        <div className="header">
            <div className="logo-info">
                <h1>BookClub</h1>
                <img src={bookWorm} alt="Book Worm"></img>
            </div>
            <SpeedDialDown />
        </div >)
}

export default NavBar