import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

import { logout } from '../api/userAPI';

const NavigationBar = () => {

    const logoutUser = (event) => {
        event.preventDefault();

        let response = logout({});

        console.log(response);
    }

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
                    <Nav.Link as={Link} to="/signup" title="Create Account">
                        Create Account
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login" title="Login">
                        Login
                    </Nav.Link>
                    <form onClick={logoutUser}>
                        <input type="submit" value="Logout"/>
                    </form>
                </Nav>
            </Container>
        </Navbar>
    </>
}

export default NavigationBar;