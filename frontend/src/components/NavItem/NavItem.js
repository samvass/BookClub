import "./NavItem.css"

const NavItem = (props) => {

    return (
        <li className="nav-item">
            <a href="#" className="icon-button">
                {props.icon} {props.label}
            </a>
        </li>)
}

export default NavItem