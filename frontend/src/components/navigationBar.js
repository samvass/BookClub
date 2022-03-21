import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import UserContext from "../user/UserContext";

const NavigationBar = (props) => {
    const { username } = useContext(UserContext);

    return <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" title="Home">
                    BookClub
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" title="Home">
                        Home
                    </Nav.Link>
                    {username !== "" && <Nav.Link as={Link} to="/myLibrary" title="My Library">
                        My Library
                    </Nav.Link>}
                    {username !== "" && <Nav.Link as={Link} to="/myAccount" title="My Account">
                        My Account
                    </Nav.Link>}
                    {username === "" && <Nav.Link as={Link} to="/signup" title="Create Account">
                        Create Account
                    </Nav.Link>}
                    {username === "" &&
                        <Nav.Link as={Link} to="/login" title="Login">
                            Login
                        </Nav.Link>}
                    {username !== "" &&
                        <Nav.Link as={Link} to="/logout" title="Logout" >
                            Logout
                        </Nav.Link>}
                </Nav>
            </Container>
        </Navbar>
    </>
}

export default NavigationBar;